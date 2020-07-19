import React, {useState, useEffect} from 'react';
import Popup from "reactjs-popup";

import { Container } from '@material-ui/core';
import { Backdrop } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';
import { array } from 'prop-types';

const wikipediaLoadingMessage = () => {
  return (
    <p> Hi There! <br/>
    I'm trying to fetch the data from Wikipedia right now. <br/>
    This might take a few seconds.</p>
  )
}

async function getSongsByBand(band_name) {
  band_name = band_name.replace(" ", "_");
  let URL = `http://localhost:5000/get_songs_by_band?artist_name=${band_name}`;
  let fetchURL = await fetch(URL);
  let response = await fetchURL;
  let results = await response.json();
  let songs = await results.songs;
  return songs
}

function BandNameInput (props) {
  const [band_name, setBandName] = useState(props.band_name);
  const [open_loader, setOpenLoader] = useState(false);
  const [message, setMessage] = useState(wikipediaLoadingMessage());

  useEffect(() => {
    function setContainter() {
      setBandName(props.band_name);
    }
    setContainter();
  }, [props.band_name]);

  async function fetchBand(search_band_name) {
    setOpenLoader(true);
    await getSongsByBand(search_band_name).then( (song_list)  => {
      setOpenLoader(false);
      props.sendSongs(song_list, band_name);
      return
    });
  };

  return (
    <>
      <div className = {"band-name-input"}>
        <form onSubmit={(event) => {event.preventDefault(); fetchBand(band_name)}}>
          <input 
            type = "text"
            value = {band_name}
            placeholder = {"Type the band name and press enter."}
            onChange = {(event) => setBandName(event.target.value)}
          />
        </form>
      </div>

      <Popup 
        className={"band-name-backdrop"}
        open={open_loader}
        modal={true}
        contentStyle = {{
          "backgroundColor": "lightblue",
          "textAlign" : "center",
          "contentAlign": "center",
          "fontSize" : "22px",
          "borderRadius": "30px",
          "border": "2px solid black",
        }}
        >

        {message}
        <CircularProgress color="inherit" />
      </Popup>
    </>
  )
} 

export default BandNameInput
