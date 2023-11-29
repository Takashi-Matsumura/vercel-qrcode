// camera.js

// カメラを切り替える関数
export const switchCamera = async (deviceId) => {
  // 利用可能なメディアデバイスを取得
  const devices = await navigator.mediaDevices.enumerateDevices();

  // デバイスのリストからビデオデバイス（カメラ）を抽出
  const videoDevices = devices.filter((device) => device.kind === "videoinput");

  // 現在のカメラのインデックスを取得
  const currentDeviceIndex = videoDevices.findIndex(
    (device) => device.deviceId === deviceId
  );

  // 次のカメラのインデックスを計算（現在のインデックス+1をビデオデバイスの数で割った余り）
  const nextDeviceIndex = (currentDeviceIndex + 1) % videoDevices.length;

  // 次のカメラのデバイスIDを取得
  const nextDeviceId = videoDevices[nextDeviceIndex].deviceId;

  // 次のカメラのデバイスIDを返す
  return nextDeviceId;
};
