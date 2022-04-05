import React, { useState, useEffect } from "react";
import axios from "axios";
import ConnectAccount from "../../Auth/Auth"
import KodeSong from "../../components/kodeSong";



export default function Home() {
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [tracks, setTracks] = useState([]);
  const [songSelect, setSongSelect] = useState([]);
 
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
    setToken("")
   // window.localStorage.removeItem("token")
}

const searchArtists = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            q: searchKey,
            type: "track"
        }
    })

    setTracks(data.tracks.items)
}

const handleSelected = (song) => {
    if (!songSelect.includes(song)) {
      setSongSelect([...songSelect, song]);
    } else {
      setSongSelect(songSelect.filter((elem) => elem !== song));
    }
  };
  
return (
  <div className="App">
      <header className="App-header">     
      <div className="kotak">
      <div className="judul">
          <h1>SPOTIFY</h1>
          {token ?
              <form onSubmit={searchArtists}>
                  <input  type="text" onChange={e => setSearchKey(e.target.value)}/>
                  <button className="bot1" type={"submit"}>Search</button> 
              </form>

              : <p>Please login your accounts</p>
          }
          <br></br>
          {!token ? (
               <a href={ConnectAccount()}>Login</a>
                    ) : (
                <button className="bot2" onClick={logout}>Logout</button>)}   
   </div>
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
