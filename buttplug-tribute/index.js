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

const getConnectButton = () => document.querySelector(config.connectButton);
const getTributeButton = () => document.querySelector(config.tributeButton);

async function onClickConnect() {
  let client = new Buttplug.ButtplugClient("Tutorial Client");
  client.addListener("deviceadded", async (_device) => {
    device = _device;
    await client.StopScanning();
  });

  try {
    const connector = new Buttplug.ButtplugEmbeddedClientConnector();
    await client.Connect(connector);
  } catch (e) {
    config.debug && console.log(e);
    return;
  }

  await client.StartScanning();
}

async function onClickTribute() {
  document.removeEventListener("mousemove", onMouseMove);
  setInterval(async () => {
    await vibrate(1);
    setTimeout(() => vibrate(0.3), 500);
  }, 1000);
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

function _onMouseMove(e) {
  var rect = getTributeButton().getBoundingClientRect();
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

const onMouseMove = throttle(_onMouseMove, 200);

domready(() => {
  getConnectButton().addEventListener("click", onClickConnect);
  getTributeButton().addEventListener("click", onClickTribute);
  document.addEventListener("mousemove", onMouseMove);
});
