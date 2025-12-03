//first we need to fetch data about the song we are editing
addEventListener("DOMContentLoaded", async function(){
    document.querySelector("#updateBtn").addEventListener("click",updateSong)
    //grab the url parameter from the url ('id' variable) to send to the backend so we can get our song
    //URLSEARCHPARAMS function allows us to grab things from the url
    const urlparam = new URLSearchParams(window.location.search)
    //grabs data from the id variable
    const songID = urlparam.get('id')
    console.log(songID)

    //then use the songID to grab the song from the backend
    const response = await fetch("http://localhost:3000/api/songs/" + songID)
    if(response.ok){
        let song = await response.json()
        console.log(song)
        document.querySelector("#title").value = song.title
        document.querySelector("#artist").value = song.artist
        document.querySelector("#released").value = song.releaseDate.substring(0,10)
        document.querySelector("#popularity").value = song.popularity
        document.querySelector("#genre").value = song.genre
    }
    
})

async function updateSong(){
    const urlparam = new URLSearchParams(window.location.search)
    //grabs data from the id variable
    const songID = urlparam.get('id')
    const song = {
        _id: songID,
        title: document.querySelector("#title").value,
        artist: document.querySelector("#artist").value,
        releaseDate: document.querySelector("#released").value,
        popularity: document.querySelector("#popularity").value,
        genre: document.querySelector("#genre").value ? 
            document.querySelector("#genre").value.split(",") : []
        }
    
    // Put a JSON-encoded song to Music API
   const response = await fetch("http://localhost:3000/api/songs/" + songID, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(song)
   });

   if (response.ok) {
      alert("Updated Song");
      
      //redirect to index
      window.location.href = "/index.html"
   }
   else {
      document.querySelector("#error").innerHTML = "Cannot add song.";
   } 
}