"use client";

// components/CameraStream.js
import React, { useRef, useEffect } from "react";

const CameraStream = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        })
        .catch((error) => {
          console.error("Error accessing the camera: ", error);
        });
    } else {
      console.error("getUserMedia not supported");
    }
  }, []);

  return (
    <div>
      <video ref={videoRef} width="640" height="480" autoPlay />
    </div>
  );
};

export default CameraStream;
