$(document).ready(onReady);

function onReady() {
    runListeners();
    getTasks();   
}

function runListeners(){
    $('#submit-btn').on('click', addTask);
    $('#todoTable').on('change','.done-checkBox', toggleComplete);
    $('#theme-toggle').on('click', toggleTheme)
    
    $('#todoTable').on('click', '.delete-btn', confirmDelete);
    $('#todoTable').on('click', '.confirmDelete', deleteTask);
}

function confirmDelete(){
    if ($(this).attr('Value') == "Are you sure?") {
        $(this).attr('Value','delete');
    } else {
        $(this).attr('Value', "Are you sure?");
    }
    $(this).parent().prev().removeClass('d-none');
    
}


function toggleTheme(){
    console.log("toggle theme");
    console.log("GET ATTRIBUTE: ", $('html').attr('data-bs-theme'));
    if ($('html').attr('data-bs-theme') == 'dark'){
        $('html').attr('data-bs-theme', 'light');
        $('#theme-toggle').text("Dark Mode");
    } else {
        $('html').attr('data-bs-theme', 'dark');
        $('#theme-toggle').text("Light Mode");
    }
}// end toggleTheme

function toggleComplete(){
    let id = $(this).parent().parent().data('id');
    $.ajax({
        method: 'PUT',
        url: `/tasks/completed/${id}`
    }).then((req,res) => {
        // console.log('toggle!')
        getTasks();
    }).catch( err => {
        console.log("err toggling task", err)
    })
}//end toggleComplete

function deleteTask (){
    let id = $(this).parent().parent().data('id')
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${id}`
    }).then((req,res) => {
        // console.log('be gone foul task!')
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
        $('#todoTable').append($element);
    }
} //end render

function getElementString(task){
    let timeString = getTimeBack(task.time);
    let elementString = `
        <tr class="complete">
            <td>
            `
    if (task.complete){ //COMPLETE
        elementString += `
            <input type="checkbox" class="done-checkBox" checked>
        </td>
        <td>${timeString}
        </td>
        <td class="tasks">${task.task}</td>
            
        `
    } else { // NOT COMPLETE
        elementString +=`
                <input type="checkbox" class="done-checkBox">
            </td>
            <td></td>
            <td>${task.task}</td>
            `
        }
    elementString += `    
        <td class="d-none">
            <input class="confirmDelete btn btn-danger" type="submit" value="Delete">
        </td>
        <td>
            <input class="delete-btn btn btn-outline-danger" type="submit" value="Delete">
        </td>
    </tr>`
    // console.log(elementString);
    return elementString
}//end getElementString

function getTimeBack(time){
    // console.log(time);
    let mins = time % 60
    mins = mins == 0 ? "00": mins < 10 ? "0"+ mins: mins;
    let hours = (time - mins) / 60
    let am = "am";
    if (hours == "12"){
        am = "pm"
    }
    if (hours > 12){ //convert to pm instead of military time.
        am = "pm";
        hours -= 12;
    }
    if (hours == 0){
        hours = "12";
    }
    // console.log("mins:", hours, mins)
    return `${hours}:${mins}${am}` //TODO: Insert the Day?

}

