import { useState, useEffect } from "react";
import { ButtplugClient, ButtplugEmbeddedClientConnector } from "buttplug";

export default function useButtPlug(ready, onNewDevice) {
  const [client, setClient] = useState(null);
  const [device, setDevice] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!ready || client) return;

    const newClient = new ButtplugClient("Cammy");
    newClient.addListener("deviceadded", (device) => {
      setDevice(device);
      setIsConnected(true);
      onNewDevice(device);
    });

    setClient(newClient);
  }, [ready, onNewDevice, client, device, isConnected]);

  useEffect(() => {
    if (!client || isConnected) return;

    async function start() {
      try {
        const connector = new ButtplugEmbeddedClientConnector();
        await client.Connect(connector);
      } catch (e) {
        console.log(e);
        return;
      }
      await client.StartScanning();
    }
    start();
  }, [client, isConnected]);

  return { client, device, isConnected };
}
