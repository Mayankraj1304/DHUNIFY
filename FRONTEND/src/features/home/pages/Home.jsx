import React from "react";
import FaceExpressionDetector from "../../expression/components/facexpression";
import Player from "../components/player";
import useSong from "../hooks/useSong";
const Home = () => {
  const { handleGetSong } = useSong();

  return (
    <main>
      <FaceExpressionDetector
        onExpressionDetected={(expression) => {
          handleGetSong({ mood: expression });
        }}
      />
      <Player />
    </main>
  );
};

export default Home;
