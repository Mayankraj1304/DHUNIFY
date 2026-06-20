import { getSong } from "../services/home.api";
import { useContext } from "react";
import { SongContext } from "../home.context";

const useSong = () => {
  const context = useContext(SongContext);

  const { loading, setloading, song, setsong } = context;
  async function handleGetSong({ mood }) {
    try {
      setloading(true);
      const data = await getSong({ mood });
      if (data && data.song) setsong(data.song);
    } finally {
      setloading(false);
    }
  }
  return { loading, song, handleGetSong };
};

export default useSong;
