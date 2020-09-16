const Buttplug = require("buttplug");
const domready = require("domready");
const throttle = require("lodash.throttle");
const d3 = require("d3-scale");

let device = null;
let config = {
  debug: false,
  connectButton: "#connect",
  tributeButton: "#tribute",
};
window.ButtplugTribute = config;

const clickHandler = async (connectAddress) => {
  let client = new Buttplug.ButtplugClient("Tutorial Client");
  client.addListener("deviceadded", async (_device) => {
    device = _device;
    await client.StopScanning();
  });

  /*
   * Now we'll try to connect to a server. Based on the button pushed
   * by the user, we'll either try to connect to a remote websocket server,
   * or to a local in-browser server.
   */
  try {
    /*
     * And here's how we connect to a local, in-browser server. Thanks to WebBluetooth (and soon,
     * the gamepad extensions API for supporting gamepad/VR controller rumble), we can run
     * a Buttplug server completely inside the web browser and still control sex toys. Connecting to
     * a local server will never fail, but is really only useful in browsers that support WebBluetooth.
     * Currently, that's only Chrome on macOS, Linux, Android, and ChromeOS.
     *
     * Also, remember that using WebBluetooth requires a secure context (https) unless you're
     * running on a whitelisted domain, which is usually just 127.0.0.1.
     */
    const connector = new Buttplug.ButtplugEmbeddedClientConnector();
    await client.Connect(connector);
  } catch (e) {
    // If something goes wrong, we're just logging to the console here. This is a tutorial on a development
    // website, so we figure the developer has already read the code and knows to look at the console.
    // At least, we hope.
    console.log(e);
    return;
  }

  /*
   * Now we've got a client up and running, we'll need to scan for devices. Calling StartScanning will
   * scan on all available busses. Some will scan until told to stop (bluetooth), others will scan once
   * and return (gamepads, usb, etc...). When a device is found, a "deviceadded" event is emitted.
   */
  await client.StartScanning();
};

function calculateDistance(elem, mouseX, mouseY) {
  return Math.floor(
    Math.sqrt(
      Math.pow(mouseX - (elem.offset().left + elem.width() / 2), 2) +
        Math.pow(mouseY - (elem.offset().top + elem.height() / 2), 2)
    )
  );
}

async function vibrate(intensity) {
  if (config.debug) console.log("vibrating at ", intensity);
  if (device && device.AllowedMessages.indexOf("VibrateCmd") >= 0) {
    try {
      await device.SendVibrateCmd(intensity);
    } catch (e) {
      config.debug && console.error(e);
    }
  }
}

function onMouseMove(e) {
  const tribute = document.querySelector(config.tributeButton);
  var rect = tribute.getBoundingClientRect();
  var x = e.clientX - rect.left; //x position within the element.
  var y = e.clientY - rect.top; //y position within the element.

  const distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
  const maxDistance = document.querySelector("body").getBoundingClientRect()
    .width;
  const scale = d3
    .scaleLinear()
    .clamp(true)
    .domain([maxDistance, 0])
    .range([0, 1]);
  vibrate(scale(distance));
}

domready(() => {
  document
    .querySelector(config.connectButton)
    .addEventListener("click", clickHandler);
  document.addEventListener("mousemove", throttle(onMouseMove, 200));
});
