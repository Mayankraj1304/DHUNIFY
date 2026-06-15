import React, { useState, useEffect, useRef } from "react";
import "../styles/facexpression.scss";
import { detectFaces, startCamera, createFaceLandmarker } from "../utils/utils";

export default function FaceExpressionDetector() {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);

  const [expression, setExpression] = useState("Detecting...");

  useEffect(() => {
    createFaceLandmarker(videoRef, faceLandmarkerRef);
  }, []);

  return (
    <div className="face-detector">
      <div className="container">
        <h2>Face Expression Detector</h2>

        <video ref={videoRef} autoPlay playsInline />

        <br />

        <button
          className="detect-btn"
          onClick={() => {
            detectFaces(videoRef, faceLandmarkerRef,setExpression);
          }}
        >
          Detect Expression
        </button>

        <div className="expression-box">{expression}</div>
      </div>
    </div>
  );
}
