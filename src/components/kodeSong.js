import React from "react";
import KodeForm from "./kodeForm";


export default function KodeSong({ tracks, selectedSong, songSelect }) {
  const renderTracks = () => {
    return tracks.map((track) => {
      return (
        <KodeForm
          key={track.id}
          track={track}
          selectedSong={selectedSong}
          songSelect={songSelect.find(
            (songSelect) => songSelect.id === track.id
          )}
        />
      );
    });
  };
  
  return <div>{renderTracks()}</div>;
}