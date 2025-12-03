addEventListener("DOMContentLoaded", async function(){
    //grab the url parameter from the url ('id' variable) to send to the backend so we can get our song
    //URLSEARCHPARAMS function allows us to grab things from the url
    const urlparam = new URLSearchParams(window.location.search)
    //grabs data from the id variable
    const songID = urlparam.get('id')
    console.log(songID)

    //then use the songID to grab the song from the backend
    const response = await fetch("http://localhost:3000/api/songs/" + songID)
    const song = await response.json()
    console.log(song)
    
    let heading = ""
    heading += `${song.title}`
    document.querySelector("h1").innerHTML = heading

    let html = ""
    html += `
            <h3>Artist:  ${song.artist} </h3>
            <p>Popularity: ${song.popularity} </p>
            <p>Release Date: ${song.releaseDate.substring(0,10)} </p>
            <p>Genre: ${song.genre} </p>
    `
    document.querySelector("div").innerHTML = html

})