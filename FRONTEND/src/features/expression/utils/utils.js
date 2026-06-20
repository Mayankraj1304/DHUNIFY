import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export const detectFaces = async (
  videoRef,
  faceLandmarkerRef,
  setExpression,
) => {
  const video = videoRef.current;

  if (!faceLandmarkerRef.current || !video) {
    console.log("FaceLandmarker not ready");
    return;
  }

  const results = faceLandmarkerRef.current.detectForVideo(
    video,
    performance.now(),
  );

  if (results.faceBlendshapes && results.faceBlendshapes.length > 0) {
    const blendshapes = results.faceBlendshapes[0].categories;

    const smile =
      blendshapes.find((b) => b.categoryName === "mouthSmileLeft")?.score || 0;

    const smileRight =
      blendshapes.find((b) => b.categoryName === "mouthSmileRight")?.score || 0;

    const jawOpen =
      blendshapes.find((b) => b.categoryName === "jawOpen")?.score || 0;

    const mouthFrownLeft =
      blendshapes.find((b) => b.categoryName === "mouthFrownLeft")?.score || 0;

    const mouthFrownRight =
      blendshapes.find((b) => b.categoryName === "mouthFrownRight")?.score || 0;

    if (smile > 0.5 || smileRight > 0.5) {
      setExpression("😊 Happy");
    } else if (jawOpen > 0.6) {
      setExpression("😮 Surprised");
    } else if (mouthFrownLeft > 0.04 || mouthFrownRight > 0.04) {
      setExpression("😢 Sad");
    } else {
      setExpression("😐 Neutral");
    }
  }
};

export const startCamera = async (videoRef) => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });

  videoRef.current.srcObject = stream;

  videoRef.current.onloadedmetadata = () => {
    videoRef.current.play();
  };
};

export const createFaceLandmarker = async (videoRef, faceLandmarkerRef) => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm",
  );

  faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
    },
    runningMode: "VIDEO",
    outputFaceBlendshapes: true,
    numFaces: 1,
  });

  startCamera(videoRef);
};
