export const ConnectAccount = () => {
  const config = {
    CLIENT_ID: "8ac9be97ab0a4fb8b02c48ceede77c6f",
    REDIRECT_URI: "http://localhost:3000",
    AUTH_ENDPOINT: "https://accounts.spotify.com/authorize",
    RESPONSE_TYPE: "token",
    SCOPE: "playlist-modify-private",
  };

  let loginSpotify = `${config.AUTH_ENDPOINT}?client_id=${config.CLIENT_ID}&redirect_uri=${config.REDIRECT_URI}&response_type=${config.RESPONSE_TYPE}&scope=${config.SCOPE}`;

  window.location.replace(loginSpotify);
};

export const getUserInfo = async (token: string) => {
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
