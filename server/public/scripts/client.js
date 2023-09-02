$(document).ready(onReady);

function onReady() {
    $('#submit-btn').on('click', addTask);
    $('#todoTable').on('click', '.delete-btn', deleteTask);
    $('#todoTable').on('change','.done-checkBox', toggleComplete);

    // load data from the server, put it on the DOM
    getTasks();   
}

function toggleComplete(){
    console.log("toggle!")
    let id = $(this).parent().parent().data('id');

    console.log('toggle id: ', id);
    $.ajax({
        method: 'PUT',
        url: `/tasks/completed/${id}`,
    }).then((req,res) => {
        console.log('toggle task done')
        getTasks();
    }).catch( err => {
        console.log("err toggling task", err)
    }
    );
}//end toggleComplete

function deleteTask (){
    // console.log("this.data:", $(this).parent().parent().data )

    let id = $(this).parent().parent().data('id')
    console.log('Delete id: ', id);
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${id}`
    }).then((req,res) => {
        console.log('be gone foul task!')
        getTasks();
    }).catch();

} //end deleteTask


function addTask() {
    // Get info to send to the server
    const taskToSend = { task: $('#todoIn').val() };
    console.log('Adding task', taskToSend);

    // Send the new task to the server
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: taskToSend
    }).then(function(response) {
        console.log(response);
        getTasks();
    }).catch(function(error) {
        console.log('error in task post', error);    
    });
}//end addTask


function getTasks() { 
    // get task data from the server
    $.ajax({
        method: 'GET',
        url: '/tasks'
    }).then(function(response) {
        render(response);
    }).catch(function (error) {
        console.log('error in task get', error);
    });
}//end getTask

function render( tasks ) {
    // Empty previous data
    $('#todoTable').empty();

    // Add all Tasks to table
    for(let task of tasks) {
        let $element = $( getElementString(task) );
        $element.data('id',task.id);
        console.log("task.id added to .data():", task.id);
        $('#todoTable').append($element);
    }
} //end render

function getElementString(task){
    let elementString;
    if (task.complete){
        elementString = `
        <tr class="thisOne">
            <td>
                <input type="checkbox" class="done-checkBox completed" checked></td>
            <td>${task.task}</td>
            <td>
                <input class="delete-btn" class="btn" type="submit" value="Delete">
            </td>
        </tr>`
    } else {
        elementString =`
        <tr>
            <td>
                <input type="checkbox" class="done-checkBox">
            </td>
            <td>${task.task}</td>
            <td>
                <input class="delete-btn" class="btn" type="submit" value="Delete">
            </td>
        </tr>`
    }
    return elementString
}//end getElementString


