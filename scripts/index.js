//we can either do windows onload or this is a bit easier add an event listener for DOMContentLoaded
//what this means is that as soon as the webpage loads we trigger a request for all the songs
//we need to this because we need to grab the list of songs to populate the div without a button press
addEventListener("DOMContentLoaded", async function(){
  const response = await fetch("http://localhost:3000/api/songs");
  const songs = await response.json();
    
   let html = "";
   for (let song of songs) {
      html += `<li>${song.title} - ${song.artist}</li>`;
   }

   document.querySelector("#list-of-songs").innerHTML = html;
})

 