import React, { useState, useEffect } from "react";
import axios from "axios";
import ConnectAccount from "../../Auth/Auth";
import KodeSong from "../../components/kodeSong";
import PickSong from "../../components/showPrev";
import FormCreatePlaylist from "../../components/createPlaylist";
import { getUserInfo, createPlaylist } from "../../Auth/api";

export default function Home() {
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [tracks, setTracks] = useState([]);
  const [songSelect, setSongSelect] = useState([]);
  const [userInfo, setUserInfo] = useState([]);
  const [show, setShow] = useState(false);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (token) {
      getUserInfo(token).then((res) => {
        setUserInfo(res);
      });
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    searchArtists(keyword, token).then((data) => setTracks(data));
  };

  useEffect(() => {
    const hash = window.location.hash;
    // let tkn = window.localStorage.getItem("token");

    if (!token && hash) {
      setToken(
        hash
          .substring(1)
          .split("&")
          .find((elem) => elem.startsWith("access_token"))
          .split("=")[1]
      );
      window.location.hash = "";

      // window.localStorage.setItem("token", token);
    }
    // setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    // window.localStorage.removeItem("token")
  };

  const searchArtists = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "track",
      },
    });

    setTracks(data.tracks.items);
  };

  const handleSelected = (song) => {
    if (!songSelect.includes(song)) {
      setSongSelect([...songSelect, song]);
    } else {
      setSongSelect(songSelect.filter((elem) => elem !== song));
    }
  };

  const PreviewSong = Object.values(songSelect).map((track) => (
    <PickSong
      key={track.id}
      titleSong={track.name}
      coverAlbum={track.album.images[0].url}
      nameArtist={track.artists}
    />
  ));

  // Handle create playlist
  const handleCreatePlaylist = (e) => {
    e.preventDefault();

    // Retrieve the user's input
    const playlistData = {
      name: e.target.title.value,
      description: e.target.desc.value,
    };

    // Create playlist and add the selected tracks
    const tracksToAdd = songSelect.map((track) => track.uri);
    createPlaylist(userInfo.id, playlistData, tracksToAdd, token);

    // Reset State
    setSongSelect([]);
    setShow(false);
  };

  const handleChange = (e) => setKeyword(e.target.value);

  return (
    <div className="App">
      <header className="App-header">
        <div className="kotak">
          <div className="judul">
            <h1>SPOTIFY</h1>
            {token ? (
              <div>
                <form onSubmit={searchArtists}>
                  <input
                    type="text"
                    onChange={(e) => setSearchKey(e.target.value)}
                  />
                  <button className="bot1" type={"submit"}>
                    Search
                  </button>
                </form>
              </div>
            ) : (
              <p>Please login your accounts</p>
            )}
            <br></br>
            {!token ? (
              <a href={ConnectAccount()}>Login</a>
            ) : (
              <div>
                {" "}
                <button className="bot2" onClick={logout}>
                  Logout
                </button>
                <FormCreatePlaylist
                  onSubmit={handleCreatePlaylist}
                  show={show}
                  onClose={() => setShow(false)}
                />{" "}
              </div>
            )}
          </div>
        </div>
        <div>
          {songSelect.length > 0 ? (
            <div className="preview-selected-tracks">{PreviewSong}</div>
          ) : null}
        </div>
        <div className="konten">
          <KodeSong
            tracks={tracks}
            selectedSong={handleSelected}
            songSelect={songSelect}
          />
        </div>
      </header>
    </div>
  );
}
