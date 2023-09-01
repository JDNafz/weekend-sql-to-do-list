const express = require('express');

const app = express();
const PORT = 5000;


app.use(express.urlencoded({extended: true}));
app.use(express.static('server/public'));

let tasksRouter = require('./routes/tasks.router.js');
app.use('/tasks', tasksRouter);


app.listen(PORT, () => {
    console.log('Beep Boop I\'m on', PORT)
});



//  ✅ set up front end html
// set up db: weekend-to-do-app > tasks TABLE
    // include database.sql text file
    //


// POST client task, server route, route Pool, SQL command 
// DATAFORMAT { (id), complete, taskDescription} 
// GET client tasks, server route, route pool, SQL command
// RENDER client 
    // client DELETE button
// DELETE client task, server route, route pool, SQL command
// Complete-btn/box client ajax, server route, route pool, SQL command

//css styling on completed



