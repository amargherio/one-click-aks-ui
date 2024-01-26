import { useEffect, useState } from "react";
import { ImSpinner10 } from "react-icons/im";
import { Link } from "react-router-dom";
import { ServerHosting } from "../../../dataStructures";
import { getDefaultServerHosting } from "../../../defaults";
import { useManagedServer } from "../../../hooks/useManagedServer";
import { useServerStatus } from "../../../hooks/useServerStatus";
import Alert from "../../UserInterfaceComponents/Alert";

export default function ServerNotConnected() {
	const [severHosting, setServerHosting] = useState<ServerHosting>(getDefaultServerHosting());
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
			<Alert variant="warning">
				<strong>⚠️ Server Not Connected:</strong> Your self-hosted server is not available. Check your{" "}
				<Link to="/settings" className="cursor-pointer text-sky-600 underline">
					Settings
				</Link>{" "}
				to make sure server is deployed and <a className="underline">endpoint</a> is correct.
			</Alert>
		);
	}

	if (managedServer === undefined || managedServer?.status === "Unregistered") {
		return (
			<Alert variant="warning">
				<strong>⚠️ Server Not Deployed:</strong> ACT Labs{" "}
				<a className="underline">requires user to deploy the server.</a> Goto{" "}
				<Link to="/settings" className="cursor-pointer text-sky-600 underline">
					Settings
				</Link>{" "}
				to register and deploy managed server or self-host on docker.
			</Alert>
		);
	}

	if (managedServer?.status === "Deploying") {
		return (
			<Alert variant="info">
				<div className="flex items-center gap-2">
					<ImSpinner10 className="animate-spin" />
					<strong>Deploying Managed Server:</strong> Deployment is in progress. Page will auto reload once deployment
					completes.
				</div>
			</Alert>
		);
	}

	if (managedServer?.status === "Destroyed") {
		return (
			<Alert variant="warning">
				<strong>⚠️ Managed Server Not Deployed:</strong> You have destroyed server manually. Please deploy again from{" "}
				<Link to="/settings" className="cursor-pointer text-sky-600 underline">
					Settings
				</Link>{" "}
				page.
			</Alert>
		);
	}

	if (managedServer?.status === "AutoDestroyed" && managedServer?.autoCreate === true) {
		return (
			<Alert variant="info">
				<div className="flex items-center gap-2">
					<ImSpinner10 className="animate-spin" />
					<strong>Deploying Managed Server:</strong> Managed server was destroyed due to inactivity. Deploying again
					momentarily.
				</div>
			</Alert>
		);
	}

	if (managedServer?.status === "AutoDestroyed" && managedServer?.autoCreate === false) {
		return (
			<Alert variant="warning">
				<strong>Managed Server Destroyed:</strong> Managed server was destroyed due to inactivity and auto-deploy is
				disabled. Deploy again from{" "}
				<Link to="/settings" className="cursor-pointer text-sky-600 underline">
					Settings
				</Link>
				.
			</Alert>
		);
	}

	if (managedServer?.status === "Running" && serverStatus?.status !== "OK") {
		return (
			<Alert variant="info">
				<div className="flex items-center gap-2">
					<ImSpinner10 className="animate-spin" />
					<strong>Waiting for DNS Sync:</strong> This can take several minutes. Please don't destroy the managed server.
				</div>
			</Alert>
		);
	}

	if (managedServer?.status === "Registered" && serverStatus?.status !== "OK") {
		return (
			<Alert variant="info">
				<strong>☑️ Registration Completed:</strong> Managed server is now registered, Please go to{" "}
				<Link to="/settings" className="cursor-pointer text-sky-600 underline">
					Settings
				</Link>{" "}
				and 'Deploy' button to deploy managed server.
			</Alert>
		);
	}

	return (
		<Alert variant="danger">
			<strong>🛑 Unexpected Error:</strong> Something unexpected happened, please report this issue.
		</Alert>
	);
}
