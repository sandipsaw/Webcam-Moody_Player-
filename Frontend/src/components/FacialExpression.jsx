import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { FaCirclePlay } from "react-icons/fa6";
import { BsFillPauseCircleFill } from "react-icons/bs";

const FacialExpression = () => {
  const videoRef = useRef(null);

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

      startVideo();
    };
    loadModels();
  }, []);

  const detectFace = async () => {
    if (!videoRef.current) return;

    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();
    console.log(detections[0].expressions);

    if (!detections || detections.length === 0) {
      console.log("Face not found please  show your face to get music as your mood");
    }

    if (detections.length > 0) {
      const expressions = detections[0].expressions;
      const topExpression = Object.entries(expressions)
        .reduce((max, curr) => (curr[1] > max[1] ? curr : max));
      console.log("Dominant expression:", topExpression[0]);
    }
  };

  const [songs, setsongs] = useState([
    {
      title: "saiyara",
      artistname: "sandip saw",
      mood: "happy"
    },
    {
      title: "saiyara",
      artistname: "sandip saw",
      mood: "happy"
    },
    {
      title: "saiyara",
      artistname: "sandip saw",
      mood: "happy"
    }
  ])
  const render = songs.map((song) => (
    <div className="p-5 rounded-[15px]  bg-yellow-300 mt-5 flex items-center justify-between ">
      <div className="">
        <p>{song.title}</p>
        <p>{song.artistname}</p>
      </div>
      <div className="flex">
        <BsFillPauseCircleFill />
        <FaCirclePlay />
      </div>
    </div>
  ))
  return (
    <div className="flex gap-20 justify-center">
      <div className="w-2/5 ml-5 mt-5">
        <h2 className="lg:text-[36px] sm:text-[28px] leading-10 text-black font-semibold mb-1">
          Live Mood Detection    🎦
        </h2>
        <p className="text-black mt-2 mb-2 text-center text-[20px] font-semibold leading-6">
          The app analyzes your facial expressions in real time and classifies your mood as happy, sad, angry, neutral, or surprised. Based on your mood, it instantly queues and plays a matching track.
        </p>
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
        <button onClick={detectFace} className="w-full rounded border-green-600 bg-green-500 px-10 py-3 border text-xl font-semibold text-black mt-2">
          Moodify Songs
        </button>
      </div>
      <div className="  mt-5">
      <p className="text-5xl font-semibold mb-5">Related Songs as your mood</p>
        {render}
      </div>
    </div>
  );
};

export default FacialExpression;
