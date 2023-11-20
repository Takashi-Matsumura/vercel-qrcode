import Image from "next/image";
import QrReader from "./components/QrReader";
import CameraStream from "./components/CameraStream";
import CameraStreamWithQRReader from "./components/CameraStreamWithQRReader";

export default function Home() {
  return (
    <div>
      <header>ヘルパーステーションOCC</header>
      <main className="main h-screen">
        <div className="flex flex-col justify-center items-center">
          <h1>Camera Stream Sample</h1>
          <CameraStreamWithQRReader />
        </div>
      </main>
      <footer className="text-right">@OCC 2023 α</footer>
    </div>
  );
}
