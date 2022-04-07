// Search for tracks
export const getTracks = async (keyword, token) => {
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${keyword}&type=track&limit=15`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const res = await response.json();
  const data = await res.tracks.items;
  return data;
};

// Get the token from authorization
export const getToken = () => {
  const hash = window.location.hash;
  let token = localStorage.getItem("token");

  if (!token && hash) {
    token = hash
      .substring(1)
      .split("&")
      .find((elem) => elem.startsWith("access_token"))
      .split("=")[1];
    window.location.hash = "";
    localStorage.setItem("token", token);
  }
  return token;
};

// Get user info
export const getUserInfo = async (token) => {
  const response = await fetch("https://api.spotify.com/v1/me/", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const userData = await response.json();
  return userData;
};

export const createPlaylist = async (
  userId,
  { name, description },
  tracksToAdd,
  token
) => {
  const response = await fetch(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        description: description,
        public: false,
      }),
    }
  );
  const playlist = await response.json();
  addTracksToPlaylist(playlist.id, tracksToAdd, token);
};

export const addTracksToPlaylist = async (id, tracks, token) => {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${id}/tracks`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: tracks,
      }),
    }
  );
};
