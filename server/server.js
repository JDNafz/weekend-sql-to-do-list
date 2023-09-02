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
//  ✅ set up db: weekend-to-do-app > tasks TABLE
    //  ✅ include database.sql text file


//  ✅ POST client task, server route, route Pool, SQL command 
//  ✅  DataFormat { (id), complete, taskDescription} 
//  ✅ GET client tasks, server route, route pool, SQL command
//  ✅ RENDER client 
    //  ✅ client DELETE button
//  ✅ DELETE client task, server route, route pool, SQL command
//  ✅ Complete-btn/box client ajax, server route, route pool, SQL command

//  ✅ css styling on completed

//  ✅ Finish a nice readme
//          Round 2 of readme
//          Add gifs

// ✅ feature-time-completed
//         ✅  record when a task was completed, display on DOM
//             ✅  refactor db to hold time completed.
//             ✅  reformat time to DOM
//                  go back and add Day of the week or date?

//  feature-confirm-delete
//      create an 'are you sure?' bootstrap modal? Sweet Alert?> CDN option

// feature-light-dark-mode
//          enable a toggle for light or dark mode

// feature-ordering-task-query
//       Research [Query Params](https://expressjs.com/en/api.html#req.query) to have the request reverse the order of the returned TODOs  



// feature-modules
//          add modules to clean up script files
//          getTimeBack
//          getElementString