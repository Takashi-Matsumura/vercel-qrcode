// camera.js

// カメラを切り替える関数
export const switchCamera = async (deviceId) => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const videoDevices = devices.filter((device) => device.kind === "videoinput");

  // If deviceId is null or not found in the list of video devices, use the first video device
  let currentDeviceIndex = videoDevices.findIndex(
    (device) => device.deviceId === deviceId
  );
  if (currentDeviceIndex === -1) {
    currentDeviceIndex = 0;
  }

  const nextDeviceIndex = (currentDeviceIndex + 1) % videoDevices.length;
  const nextDeviceId = videoDevices[nextDeviceIndex].deviceId;

  return nextDeviceId;
};
