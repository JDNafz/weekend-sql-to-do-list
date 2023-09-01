$(document).ready(onReady);

function onReady() {
    $('#submit-btn').on('click', addTask);
    $('#').on('click', '.delete-btn', deleteTask);

    // load data from the server, put it on the DOM
    getTasks();   
}

function deleteTask (){
    // console.log("this.data:", $(this).parent().parent().data )

    let id = $(this).parent().parent().data('id')
    console.log('Delete id: ', id);
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${id}`
    }).then((req,res) => {
        console.log('begon foul task!')
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
        
        let element = $(`
            <tr>
                <td>${task.name}</td>
                <td>
                    <input class="delete-btn" class="btn" type="submit" value="remove">
                </td>
            </tr>`);
        element.data('id',task.id)
        $('#todoTable').append(element);
    }
} //end render
