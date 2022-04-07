import React from "react";
import "./kodeSong.css";
import "./kodeForm.css";

export default function kodeForm({ track, selectedSong, songSelect }) {
  return (
    <div className="cards" key={track.id}>
      <div className="konten">
        <div className="kotak-img">
          {track.album.images.length ? (
            <img src={track.album.images[0].url} alt="" />
          ) : (
            <div>No Image </div>
          )}
        </div>

        <div className="kotak-main">
          <h3>{track.name}</h3>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <button
        className={songSelect ? "kotak-btn1" : "kotak-btn"}
        onClick={() => selectedSong(track)}
      >
        {!songSelect ? "Select" : "Deselect"}
      </button>
    </div>
  );
}
