"use client";

// components/CameraStreamWithQRReader.js
import React, { useRef, useEffect, useState } from "react";
import jsQR from "jsqr";

const CameraStreamWithQRReader = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [qrCodeText, setQrCodeText] = useState("");
  const [facingMode, setFacingMode] = useState("user"); // デフォルトはフロントカメラ

  useEffect(() => {
    // カメラへのアクセス
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode } })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.muted = true; // ビデオをミュートに設定
          videoRef.current.play();
          //scanQRCode();
        })
        .catch((error) => {
          console.error("Error accessing the camera: ", error);
        });
    } else {
      console.error("getUserMedia not supported");
    }
  }, [facingMode]);

  const scanQRCode = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext("2d");

    const scan = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });

        if (code) {
          const decoder = new TextDecoder("utf-8");
          const decodedData = decoder.decode(new Uint8Array(code.binaryData));
          const jsonData = JSON.parse(decodedData);
          console.log(jsonData);
          setQrCodeText(jsonData);
        } else {
          requestAnimationFrame(scan);
        }
      } else {
        requestAnimationFrame(scan);
      }
    };
    scan();
  };

  const switchCamera = () => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user")); // カメラを切り替え
  };

  return (
    <div>
      <video ref={videoRef} style={{ display: "none" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <div>
        <hr />
        <video
          className="p-10"
          ref={videoRef}
          width="320"
          height="240"
          autoPlay
          playsInline
          muted
        />
        <div className="flex items-center justify-between">
          <button onClick={switchCamera}>Switch Camera</button>
          <button onClick={scanQRCode}>Push me!</button>
        </div>
        <p className="p-10">QRコードの内容: {qrCodeText}</p>
      </div>
    </div>
  );
};

export default CameraStreamWithQRReader;
