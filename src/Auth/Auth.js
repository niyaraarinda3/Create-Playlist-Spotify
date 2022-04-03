const ConnectAccount= () => {
  const CLIENT_ID = "8ac9be97ab0a4fb8b02c48ceede77c6f"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  const SCOPE = "playlist-modify-private"

  const loginSpotify = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

  return loginSpotify;
};
  export default ConnectAccount;