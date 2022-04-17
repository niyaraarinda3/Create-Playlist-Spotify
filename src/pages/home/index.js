import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import KodeSong from "../../components/kodeSong";
import PickSong from "../../components/showPrev";
import FormCreatePlaylist from "../../components/createPlaylist";
import { getUserInfo } from "../../Auth/auth";
import { createPlaylist } from "../../Auth/api";
//import ConnectAccount from "../../Auth/Auth";
import TokenContext from "../../context/TokenContext";
import LoginPage from "../login";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./index.css";

export default function Home() {
  const { token, setToken } = useContext(TokenContext);
  // const [token, setToken] = useState("");
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

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   searchArtists(keyword, token).then((data) => setTracks(data));
  // };

  const logout = () => {
    setToken("");
    //window.localStorage.removeItem("token");
    localStorage.removeItem("token");
  };

  const searchArtists = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit: 12,
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
    // setShow(false);
  };

  // const handleChange = (e) => setKeyword(e.target.value);

  return (
    <div className="App">
      <header className="App-header">
        <div className="kotak">
          <div className="judul">
            <h1>SPOTIFY</h1>
            {token ? (
              <div>
                <form onSubmit={searchArtists}>
                  <TextField
                    variant="outlined"
                    required
                    size="small"
                    placeholder="search song"
                    type="text"
                    //fullWidth="100"
                    onChange={(e) => setSearchKey(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    color="success"
                    size="small"
                    type={"submit"}
                    //fullWidth="100"
                  >
                    Search
                  </Button>
                </form>
              </div>
            ) : (
              <p>Please login your accounts</p>
            )}
            <br></br>
          </div>
          {!token ? (
            <LoginPage />
          ) : (
            <Button
              onClick={logout}
              variant="contained"
              color="error"
              size="small"
            >
              Logout
            </Button>
          )}
        </div>

        {songSelect.length > 0 ? (
          <div>
            <div className="preview-selected-tracks">{PreviewSong}</div>
            <div style={{ clear: "both" }} />
            <FormCreatePlaylist onSubmit={handleCreatePlaylist} show={show} />
          </div>
        ) : null}

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
