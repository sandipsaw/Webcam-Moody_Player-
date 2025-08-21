import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const FacialExpression = () => {
  const videoRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(err => console.error("Camera error:", err));
  };

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      ]);
      setModelsLoaded(true);
      startVideo();
    };
    loadModels();
  }, []);

  useEffect(() => {
    let intervalId;

    const detectFace = async () => {
      if (!videoRef.current) return;

      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
        console.log(detections[0].expressions);
        
        if()
        
      if (detections.length > 0) {
        const expressions = detections[0].expressions;
        const topExpression = Object.entries(expressions)
          .reduce((max, curr) => (curr[1] > max[1] ? curr : max));
        console.log("Dominant expression:", topExpression[0]);
      }
    };

    if (videoRef.current) {
      videoRef.current.addEventListener("play", () => {
        intervalId = setInterval(detectFace, 300);
      });
    }

    return () => clearInterval(intervalId);
  }, [modelsLoaded]);

  return (
    <div className="w-2/5 ml-5 mt-5">
      {!modelsLoaded && <p>Loading models...</p>}
      <h2 className="text-[36px] leading-10 text-black font-semibold mb-1">
        Live Mood Detection🎦
      </h2>
      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          muted
          className="mt-3 rounded"
        />
        <p className="absolute right-5 top-2 text-xl text-black italic">
          Look at the screen — we’ll play your vibe...
        </p>
      </div>
      <p className="text-black mt-2 mb-2 text-center text-[20px] font-semibold leading-6">
        The app analyzes your facial expressions in real time and classifies your mood as happy, sad, angry, neutral, or surprised. Based on your mood, it instantly queues and plays a matching track.
      </p>
      <button className="w-full rounded border-green-600 bg-green-500 px-10 py-3 border text-xl font-semibold text-black mt-2">
        Moodify Songs
      </button>
    </div>
  );
};

export default FacialExpression;
