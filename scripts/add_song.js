addEventListener("DOMContentLoaded", function() {
   document.querySelector("#addBtn").addEventListener("click", addSong);
});

async function addSong() {
   // Create a song object from the form fields
   const song = {
      title: document.querySelector("#title").value,
      artist: document.querySelector("#artist").value,
      releaseDate: document.querySelector("#released").value,
      popularity: document.querySelector("#popularity").value,
      genre: document.querySelector("#genre").value ? 
         document.querySelector("#genre").value.split(",") : []
   };

   // POST a JSON-encoded song to Music API
   const response = await fetch("http://localhost:3000/api/songs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(song)
   });

   if (response.ok) {
      const results = await response.json();
      alert("Added song with ID " + results._id);

      // Reset the form after adding the song
      document.querySelector("form").reset();
   }
   else {
      document.querySelector("#error").innerHTML = "Cannot add song.";
   }     
}