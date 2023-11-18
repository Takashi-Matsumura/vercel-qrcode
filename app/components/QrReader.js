"use client";

// components/QrReader.js
import { useState, useRef, useEffect } from "react";
import jsQR from "jsqr";

const QrReader = () => {
  const [qrCode, setQrCode] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        scanQrCode();
      })
      .catch((error) => console.error(error));
  }, []);

  const scanQrCode = () => {
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
          setQrCode(code.data);
          stream.getTracks().forEach((track) => track.stop());
        } else {
          requestAnimationFrame(scan);
        }
      } else {
        requestAnimationFrame(scan);
      }
    };
    scan();
  };

  return (
    <div>
      <video ref={videoRef} style={{ display: "none" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {qrCode && <p>QR Code: {qrCode}</p>}
    </div>
  );
};

export default QrReader;
