import React from "react";
import "./kodeSong";

export default function PickSong({ coverAlbum, titleSong, nameArtist }) {
  return (
    <div className="cardss">
      <div className="konten1">
        <div className="kotak-img">
          <img src={coverAlbum} alt="" />
          <h3>{titleSong}</h3>
        </div>
        <div className="kotak-main">
          <p>
            {nameArtist.map((artist) => artist.name).join(", ").length > 25
              ? `${nameArtist
                  .map((artist) => artist.name)
                  .join(", ")
                  .substring(0, 25)}...`
              : nameArtist.map((artist) => artist.name).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}
