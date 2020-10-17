import { useEffect } from "react";

export default function useVibrate(device, level) {
  useEffect(() => {
    if (!device) return;

    function startVibrate() {
      console.log("startVibrate()");
      device.SendVibrateCmd(level);
      console.log("startVibrate() over");
    }

    async function stopVibrate() {
      console.log("stopVibrate()");
      await device.SendStopDeviceCmd();
      console.log("stopVibrate() over");
    }

    console.log(`vibrateEffect: ${level}`);
    if (level > 0) {
      startVibrate();
    } else {
      stopVibrate();
    }
  }, [device, level]);

  return null;
}
