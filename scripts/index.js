//we can either do windows onload or this is a bit easier add an event listener for DOMContentLoaded
//what this means is that as soon as the webpage loads we trigger a request for all the songs
//we need to this because we need to grab the list of songs to populate the div without a button press
addEventListener("DOMContentLoaded", async function(){
   getAllSongs()
  
})

async function deleteSong(songID) {
   const songId = songID
   // Get the song ID of the selected song
   const response = await fetch("http://localhost:3000/api/delete/" + songId, {
      method: "DELETE"
   });

   if (response.ok) {
      // Successfully deleted song
      alert("Deleted")
      getAllSongs()
   }
   else {
      alert("Cannot Delete")
   } 
}

async function getAllSongs() {
   const response = await fetch("http://localhost:3000/api/songs");
   const songs = await response.json();
    
   let html = "";
   for (let song of songs) {
      //grab the song id to use as a link to individual songs or edit songs
      let songID = song._id
      html += `<li>${song.title} - ${song.artist} - <a href="details.html?id=${songID}">Details</a> - <a href="edit.html?id=${songID}"> Edit </a> - <input type="button" value="Delete" onclick="deleteSong('${songID}')"> </li>`;
   
   }
   

   document.querySelector("#list-of-songs").innerHTML = html;
   
}
 