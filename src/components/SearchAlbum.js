import { Button } from "@mui/material";
import axios from "axios";
import AlbumCard from "./AlbumCard";

const SearchAlbum = (props) => {
  const { albums, setAlbums, token, searchKey, setSearchKey } = props;

  const searchAlbums = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "album",
      },
    });
    setAlbums(data.albums.items);
  };

  return (
    <div>
      {token ? (
        <form onSubmit={searchAlbums}>
          <input type="text" onChange={(e) => setSearchKey(e.target.value)} />
          <Button type={"submit"}>Search Album</Button>
        </form>
      ) : (
        <h2>Please Login</h2>
      )}
      <AlbumCard albums={albums} />
    </div>
  );
};

export default SearchAlbum;
