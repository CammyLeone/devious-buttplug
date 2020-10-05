import { useState, useEffect, useRef } from "react";
import { ButtplugClient, ButtplugEmbeddedClientConnector } from "buttplug";

export default function useButtPlug(ready, onNewDevice) {
  const client = useRef(null);
  const [device, setDevice] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (client.current && !ready) {
      client.current = null;
    }
    if (client.current || !ready) return;

    client.current = new ButtplugClient("Cammy");
    client.current.addListener("deviceadded", (device) => {
      setDevice(device);
      setIsConnected(true);
      onNewDevice(device);
    });

    async function start() {
      try {
        const connector = new ButtplugEmbeddedClientConnector();
        await client.current.Connect(connector);
      } catch (e) {
        console.log(e);
        return;
      }
      await client.current.StartScanning();
    }
    start();
  }, [ready]);

  return { client, device, isConnected };
}
