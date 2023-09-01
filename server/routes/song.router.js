const express = require('express');
const router = express.Router();

const pool = require('./pool');

router.get('/', (req, res) => {
    // console.log('server is req song from db...')
    let queryText = `
    SELECT * FROM song 
    ORDER BY "title";
    `;

    pool.query(queryText).then(
        (result) => {
            // console.log("db gave client good song response", result)
            res.send(result.rows)
        }
    ).catch(
        (err) => {
            console.log(`Error making query ${queryText}`, err);
            res.sendStatus(500);
        }
    )
});

router.delete('/:id', (req,res) => {
    let queryText = `
    DELETE FROM song WHERE id = $1;
    `;

    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(`Error making query ${queryText}`,err);
            res.sendStatus(500);
        }
    )
});



router.post('/', (req, res) => {
    let newSong = req.body
    // console.log("server is sending newSong = res.body (to db):", req.body);
    // {
    // example data?
    // }

    const queryText = `
    INSERT INTO song ("title", "length","released")
    VALUES ($1, $2, $3);
    `
    pool.query(queryText, [newSong.title,newSong.length,newSong.released])
        .then(
            (result) => {
                console.log("db says here have song(s)!")
                res.sendStatus(201);
            })
        .catch(
            (err) => {
                console.log(`Error making query ${queryText}`, err);
                res.sendStatus(500);
            }
        )

});

module.exports = router;