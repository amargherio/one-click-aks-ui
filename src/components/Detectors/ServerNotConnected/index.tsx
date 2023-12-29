import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ServerHosting } from "../../../dataStructures";
import { useManagedServer } from "../../../hooks/useManagedServer";
import { useServerStatus } from "../../../hooks/useServerStatus";

export default function ServerNotConnected() {
  const [severHosting, setServerHosting] = useState<ServerHosting>({
    environment: "docker",
    endpoint: "http://localhost:8880/",
  });
  const { data: serverStatus, isError } = useServerStatus();
  const { data: managedServer } = useManagedServer();

  useEffect(() => {
    const serverHostingFromLocalStorage = localStorage.getItem("serverHosting");
    if (serverHostingFromLocalStorage != undefined && serverHostingFromLocalStorage !== "") {
      setServerHosting(JSON.parse(serverHostingFromLocalStorage));
    }
  }, []);

  if (!isError && serverStatus && serverStatus.status === "OK") {
    return <></>;
  }

  if (severHosting.environment === "docker") {
    return (
      <div className="my-4">
        <div className="mt-2 rounded border border-red-500 bg-red-500 bg-opacity-20 p-2">
          <strong>🛑 Server Not Connected:</strong> Your self-hosted server is not available. Check your{" "}
          <Link to="/settings" className="cursor-pointer text-sky-600 underline">
            Settings
          </Link>{" "}
          to make sure server is deployed and <a className="underline">endpoint</a> is correct.
        </div>
      </div>
    );
  }

  if (managedServer?.status === "Deploying") {
    return <></>;
  }

  if (managedServer?.status === "Destroyed") {
    return (
      <div className="my-4">
        <div className="mt-2 rounded border border-red-500 bg-red-500 bg-opacity-20 p-2">
          <strong>🛑 Server Not Deployed:</strong> You are using managed server but its not deployed. Please deploy your
          managed server from{" "}
          <Link to="/settings" className="cursor-pointer text-sky-600 underline">
            Settings
          </Link>
          .
        </div>
      </div>
    );
  }

  return (
    <div className="my-4">
      <div className="mt-2 rounded border border-red-500 bg-red-500 bg-opacity-20 p-2">
        <strong>🛑 Server Not Connected:</strong> Not able to connect to <a className="underline">managed server</a>.{" "}
        Try refreshing page or re-deploying server from{" "}
        <Link to="/settings" className="cursor-pointer text-sky-600 underline">
          Settings
        </Link>
        .
      </div>
    </div>
  );
}
