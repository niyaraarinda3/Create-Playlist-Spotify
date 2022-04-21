import { Key } from "react";
import KodeForm from "./kodeForm";

type Person = {
  tracks: any;
  selectedSong: void;
  songSelect: any;
};

export default function KodeSong({ tracks, selectedSong, songSelect }: Person) {
  const renderTracks = () => {
    return tracks.map((track: { id: Key }) => {
      return (
        <KodeForm
          key={track.id}
          track={track}
          selectedSong={selectedSong}
          songSelect={songSelect.find(
            (songSelect: { id: any }) => songSelect.id === track.id
          )}
        />
      );
    });
  };

  return <div>{renderTracks()}</div>;
}
