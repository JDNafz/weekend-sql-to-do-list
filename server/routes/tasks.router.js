const express = require('express');
const router = express.Router();

const pool = require('./pool');

router.get('/', (req, res) => {
    // console.log('server is req artist from db...')
    let queryText = `
    SELECT * FROM tasks 
    ORDER BY "id" ASC;
    `;
    pool.query(queryText).then(
        (result) => {
            // console.log("DB returns result.rows: ", result.rows)
            res.send(result.rows)
        }
    ).catch(
        (err) => {
            console.log(`Error making query ${queryText}`, err);
            res.sendStatus(500);
        }
    )
});


router.post('/', (req, res) => {
    let newTask = req.body
    const queryText = `
    INSERT INTO tasks ("task")
    VALUES ($1);
    `
    pool.query(queryText, [newTask.task])
        .then(
            (result) => {
                // console.log("db says Good submit to server!")
                res.sendStatus(201);
            })
        .catch(
            (err) => {
                console.log(`Error making query ${queryText}`, err);
                res.sendStatus(500);
            }
        )

});

router.delete('/:id', (req,res) => {0
    let queryText = `
    DELETE FROM tasks WHERE id = $1;
    `;
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(`Error making query ${queryText}`,err );
            res.sendStatus(500);
        }
    )
});

router.put('/completed/:id', (req,res) => {0
    let queryText = `
    UPDATE tasks
    SET "complete" = NOT "complete"
    WHERE id = $1 ;
    `;
    // console.log(req.params['id']);
    pool.query(queryText, [req.params['id']])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(`Error making query ${queryText}`,err );
            res.sendStatus(500);
        }
    )
});



module.exports = router;
