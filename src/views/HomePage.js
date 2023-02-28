import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import SearchAlbum from "../components/SearchAlbum";

const HomePage = () => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  const [albums, setAlbums] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const CLIENT_ID = "89af487bc1d449c79b867c30bd8ab4a6";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  axios.defaults.baseURL = "https://api.spotify.com/v1";
  axios.defaults.headers["Authorization"] = `Bearer ${token}`;
  axios.defaults.headers["Content-Type"] = "application/json";

  const getCurrentUserProfile = () => axios.get("/me");

  useEffect(() => {
    setToken(token);
    const fetchData = async () => {
      try {
        const { data } = await getCurrentUserProfile();
        setUser(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <div>
      <Container maxWidth="sm">
        <header className="App-header">
          {user && (
            <div>
              <h1>Welcome, {user.display_name}</h1>
              {user.images.length && user.images[0].url && (
                <img src={user.images[0].url} width="50" alt="Avatar" />
              )}
            </div>
          )}
        </header>
        <div>
          {!token ? (
            <Button variant="contained">
              <a
                href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
              >
                Login to Spotify
              </a>
            </Button>
          ) : (
            <Button variant="contained" onClick={logout}>
              Logout
            </Button>
          )}
        </div>
        <div>
          <SearchAlbum
            albums={albums}
            setAlbums={setAlbums}
            searchKey={searchKey}
            setSearchKey={setSearchKey}
            token={token}
          />
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
