$(document).ready(onReady);

function onReady() {
    $('#submit-artist').on('click', function(event) {
        event.preventDefault();
        addArtist();
    });
    $('#submit-song').on('click', function(event) {
        event.preventDefault();
        addSong();
    });
    $('#artistTableBody').on('click', '.delete-btn', deleteArtist);
    $('#songTableBody').on('click','.delete-btn', deleteSong);

    // load data from the server, put it on the DOM
    getArtists();
    getSongs();    
}

function deleteArtist (){
    // console.log("this.data:", $(this).parent().parent().data )

    let id = $(this).parent().parent().data('id')
    console.log('Delete id: ', id);
    $.ajax({
        method: 'DELETE',
        url: `/artist/${id}`
    }).then((req,res) => {
        console.log('begon foul artist!')
        getArtists();
    }).catch();

} //end deleteArtist

function deleteSong (){
   // ADD ACCESS TO DATA
   let id = (this).parent().parent().data('id')
    console.log('Delete id: ', id);
    $.ajax({
        method: 'DELETE',
        url: `/song/${id}`
    }).then((req,res) => {
        // console.log('begon foul song!')
        getSongs();
    }).catch();

} //end deleteArtist

function addArtist() {
    // Get info to send to the server
    const artistToSend = {
        name: $('#artist-name').val(), 
        birthdate: $('#artist-born').val()
    };

    console.log('Adding artist', artistToSend);

    // Send the new artist to the server as data
    $.ajax({
        method: 'POST',
        url: '/artist',
        data: artistToSend
    }).then(function(response) {
        console.log(response);
        getArtists();
    }).catch(function(error) {
        console.log('error in artist post', error); 
        alert('Error adding artist. Please try again later.')       
    });
}

function addSong() {
    // Get info to send to the server
    const newSong = {
        title: $('#song-name').val(), 
        length: $('#song-length').val(),
        released: $('#song-released').val()
    };

    console.log('Adding song', newSong);

    // Send the new artist to the server as data
    $.ajax({
        method: 'POST',
        url: '/song',
        data: newSong
    }).then(function(response) {
        console.log(response);
        getSongs();
    }).catch(function(error) {
        console.log('error in song post', error); 
        alert('Error adding song. Please try again later.')       
    });
}

function getArtists() { 
    // get artist data from the server
    $.ajax({
        method: 'GET',
        url: '/artist'
    }).then(function(response) {
        const listOfArtists = response;
        renderArtists(response);
    }).catch(function (error) {
        console.log('error in artist get', error);
    });
}

function getSongs() {
    // get song data from the server
    $.ajax({
        method: 'GET',
        url: '/song'
    }).then(function (response) {
        renderSongs(response);
    }).catch(function (error) {
        console.log('error in song get', error);
    });
}

function renderArtists( listOfArtists ) {
    // Empty previous data
    $('#artistTableBody').empty();

    // Add all artists to table
    for(let artist of listOfArtists) {
        
        let element = $(`
            <tr>
                <td>${artist.name}</td>
                <td>${artist.birthdate}</td>
                <td>
                    <input class="delete-btn" class="btn" type="submit" value="remove">
                </td>
            </tr>`);
        element.data('id',artist.id)
        $('#artistTableBody').append(element);
    }
}

function renderSongs(listOfSongs) {
    // Empty previous data
    $('#songTableBody').empty();
    // Add all songs to table
    for (let song of listOfSongs) {
        let element = $(`
            <tr>
                <td>${song.title}</td>
                <td>${song.length}</td>
                <td>${song.released}</td>
                <td>
                    <input class="delete-btn" class="btn" type="submit" value="remove">
                </td>
            </tr>`);
        element.data('id',song.id)
        $('#songTableBody').append(element);
    }
}