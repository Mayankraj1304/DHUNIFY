import React, { useEffect, useRef } from "react";
import useSong from "../hooks/useSong";
import "../styles/player.scss";

const Player = ({ onNext, onPrev, song: songProp }) => {
  const { song } = useSong();
  const audioRef = useRef(null);

  const current = songProp ||
    song || { title: "No song playing", artist: "", url: "" };

  useEffect(() => {
    if (audioRef.current && current.url) {
      audioRef.current.load();
      audioRef.current.play().catch(() => {
        // Autoplay may be blocked by browser policies
      });
    }
  }, [current.url]);

  const handlePrev = () => {
    if (typeof onPrev === "function") onPrev();
    else console.log("Player: previous track");
  };

  const handleNext = () => {
    if (typeof onNext === "function") onNext();
    else console.log("Player: next track");
  };

  return (
    <div className="player">
      <div className="player-info">
        <div className="player-title">{current.title}</div>
        {current.artist && (
          <div className="player-artist">{current.artist}</div>
        )}
      </div>

      <audio ref={audioRef} controls className="player-audio">
        <source src={current.url} type="audio/mpeg" />
        Your browser does not support audio playback.
      </audio>

      <div className="player-controls">
        <button
          aria-label="Previous"
          onClick={handlePrev}
          className="player-btn"
        >
          ⏮
        </button>

        <button aria-label="Play/Pause" className="player-btn">
          ⏯
        </button>

        <button aria-label="Next" onClick={handleNext} className="player-btn">
          ⏭
        </button>
      </div>
    </div>
  );
};

export default Player;
