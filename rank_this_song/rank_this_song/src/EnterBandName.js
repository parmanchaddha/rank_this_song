import React, {useState, useEffect} from 'react';

async function getSongsByBand(band_name) {
  let URL = `http://localhost:5000/get_songs_by_band?band_name=${band_name}/`;
  let fetchURL = await fetch(URL);
  let response = await fetchURL;
  let results = await response.json();
  let songs = await results.songs;
  return songs
}

function BandNameInput (props) {
  const [band_name, setBandName] = useState("");
  const [songs, setSongs] = useState("");

  async function fetchBand(search_band_name) {
    let songs = await getSongsByBand(search_band_name);
    setSongs(songs);
  };

  return (
    <div className = {"band-name-input"}>
      <form onSubmit={(event) => {event.preventDefault(); fetchBand(band_name)}}>
        <input 
          type = "text"
          value = {band_name}
          placeholder = {"Type the band name and press enter."}
          onChange = {(event) => setBandName(event.target.value)}
        />
      </form>
      {songs}
    </div>
  )
} 

export default BandNameInput
