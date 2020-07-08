import React, {useState, useEffect} from 'react';
import BandFormStepper from "./BandFormStepper";
import './RankThisSong.css';

function RankThisSong() {
  return (  
    <div className="App">
      <header>
        <h1> Rank This Song</h1>
      </header>

      <div>
        <BandFormStepper />
      </div>
    </div>
  );
}

export default RankThisSong;
