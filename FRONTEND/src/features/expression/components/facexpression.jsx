import { useState, useEffect, useRef } from "react";
import "../styles/facexpression.scss";
import { detectFaces, createFaceLandmarker } from "../utils/utils";

export default function FaceExpressionDetector({ onExpressionDetected }) {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);

  const [expression, setExpression] = useState("Detecting...");

  useEffect(() => {
    createFaceLandmarker(videoRef, faceLandmarkerRef).catch((error) => {
      console.error("FaceLandmarker init failed:", error);
      setExpression("Initialization failed");
    });
  }, []);

  async function handleClick() {
    const mood = await detectFaces(videoRef, faceLandmarkerRef, setExpression);
    if (mood && typeof onExpressionDetected === "function") {
      onExpressionDetected(mood);
    }
  }

  return (
    <div className="face-detector">
      <div className="container">
        <h2>Face Expression Detector</h2>

        <video ref={videoRef} autoPlay playsInline />

        <br />

        <button className="detect-btn" onClick={handleClick}>
          Detect Expression
        </button>

        <div className="expression-box">{expression}</div>
      </div>
    </div>
  );
}
