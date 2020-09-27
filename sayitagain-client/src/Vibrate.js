import { useEffect } from "react";

function Vibrate({ on, device, level }) {
  useEffect(() => {
    async function startVibrate() {
      console.log("startVibrate()");
      await device.SendVibrateCmd(level);
      console.log("startVibrate() over");
    }

    async function stopVibrate() {
      console.log("stopVibrate()");
      await device.SendStopDeviceCmd();
      console.log("stopVibrate() over");
    }

    console.log(`vibrateEffect: ${on}, ${level}`);
    if (on && level > 0) {
      startVibrate();
    } else {
      stopVibrate();
    }
  }, [on, device, level]);

  return null;
}

export default Vibrate;
