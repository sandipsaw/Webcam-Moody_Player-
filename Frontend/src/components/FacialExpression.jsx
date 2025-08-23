import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

import axios from 'axios'
const FacialExpression = ({setsongs}) => {
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

    
        let mostprobableExpression = 0
        let _mood = ''

          if(!detections || detections.length === 0){
            console.log("Face not found");
            
          }

        for(const expression of Object.keys(detections[0].expressions)){
          // console.log("moods",mood);
          if(detections[0].expressions[expression]>mostprobableExpression){
            mostprobableExpression=detections[0].expressions[expression]
            _mood = expression
          }
        }
        console.log(_mood);

    // if (detections.length > 0) {
    //   const expressions = detections[0].expressions;
    //   const topExpression = Object.entries(expressions)
    //     .reduce((max, curr) => (curr[1] > max[1] ? curr : max));
    //   console.log("Dominant expression:", topExpression[0]);
    // }

    axios.get(`http://localhost:3000/songs?mood=${_mood}`)
    .then(response=>{
      console.log(response.data);
      setsongs(response.data.songs)
    })
  };



  
  return (
    
      <div className="lg:w-2/5 w-1/1 lg:sticky lg:top-0">
        <h2 className="lg:text-[36px] sm:text-[44px] text-[36px] leading-10 text-black font-semibold mb-1">
          Live Mood Detection
        </h2>
        <p className="text-gray-800  mt-2 mb-2 lg:text-[20px] lg:leading-6 sm:text-[30px] text-[24px] font-semibold leading-6 sm:leading-9">
          The app analyzes your facial expressions in real time and classifies your mood as happy, sad, angry, or surprised. Based on your mood, it instantly queues and plays a matching track.
        </p>
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            muted
            className="mt-3 rounded sm:w-full"
          />
          <p className="absolute p-2 sm:p-0 right-5 sm:top-2 top-1 text-xl text-black italic">
            Look at the screen — we’ll play your vibe
          </p>
        </div>
        <button onClick={detectFace} className="w-full rounded border-green-600 bg-green-500 px-10 py-3 border text-xl font-semibold text-black mt-2">
          Moodify Songs
        </button>
      </div>

  );
};

export default FacialExpression;
