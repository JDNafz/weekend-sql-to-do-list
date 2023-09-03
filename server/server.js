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
