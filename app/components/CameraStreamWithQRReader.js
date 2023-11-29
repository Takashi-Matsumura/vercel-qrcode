"use client";

// components/CameraStreamWithQRReader.js
import React, { useRef, useEffect, useState } from "react";
import jsQR from "jsqr";
import ClientSideClock from "./ClientSideClock";
import { db } from "../firebaseConfig";
import {
  getDocs,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { switchCamera } from "./camera.js";

const CameraStreamWithQRReader = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [qrCodeText, setQrCodeText] = useState("");
  const [facingMode, setFacingMode] = useState("environment"); // 'user' or 'environment'

  useEffect(() => {
    // カメラへのアクセス
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode } })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.muted = true; // ビデオをミュートに設定
          videoRef.current.play();
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

  const toggleFacingMode = () => {
    setFacingMode((prevFacingMode) =>
      prevFacingMode === "user" ? "environment" : "user"
    );
  };

  const [deviceId, setDeviceId] = useState(null);

  const handleSwitchCamera = async () => {
    if (deviceId !== null) {
      const nextDeviceId = await switchCamera(deviceId);
      setDeviceId(nextDeviceId);
    }
  };

  const clearQrCodeText = () => {
    setQrCodeText("");
  };

  const recordToFirestore = async () => {
    if (!qrCodeText.name) {
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "clients"), {
        name: qrCodeText.name,
        time: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
      alert("サーバに登録しました");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
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
          width="240"
          height="240"
          autoPlay
          playsInline
          muted
        />
        <div className="flex items-center justify-between">
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSwitchCamera}
          >
            カメラ切替
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={scanQRCode}
            onDoubleClick={clearQrCodeText}
          >
            QRコード
          </button>
        </div>
        <p className="pb-2 pt-10">利用者:</p>
        <p className="flex text-3xl justify-center font-bold border py-5 w-full">
          {qrCodeText.name}
        </p>
        <div className="flex flex-col items-center justify-center">
          <ClientSideClock className="flex justify-center w-full" />
        </div>
        <div className="flex justify-end p-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={recordToFirestore}
          >
            （ヘルパー）確認
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraStreamWithQRReader;
