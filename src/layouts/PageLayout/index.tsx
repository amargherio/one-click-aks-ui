import { useEffect, useRef } from "react";
import { FaBars, FaPlus } from "react-icons/fa";
import { useGlobalStateContext } from "../../components/Context/GlobalStateContext";
import Detectors from "../../components/Detectors/Detectors";
import ResetLabState from "../../components/Lab/ResetLabState";
import Button from "../../components/UserInterfaceComponents/Button";
import DarkModeSwitch from "../../components/UserInterfaceComponents/DarkModeSwitch";

type Props = {
	heading?: string;
	children: React.ReactNode;
};

export default function PageLayout({ heading, children }: Props) {
	const { darkMode, setDarkMode, navbarOpen, setNavbarOpen } = useGlobalStateContext();
	const outerDivRef = useRef<null | HTMLDivElement>(null);

	useEffect(() => {
		if (outerDivRef.current !== null) {
			outerDivRef.current.scrollIntoView();
		}
	}, [heading]);

	return (
		<div ref={outerDivRef}>
			<Detectors />
			{heading !== undefined && (
				<div
					className={`${
						heading !== "" ? "mb-4 border-b-2 border-slate-500 py-4 " : "mt-6 "
					} flex items-center justify-between `}
				>
					<div className="flex items-center">
						<Button
							variant="secondary-icon"
							className="mr-2 p-4 text-2xl md:mr-0 md:hidden md:p-0"
							onClick={() => setNavbarOpen(!navbarOpen)}
						>
							<FaBars className="text-slate-500" />
						</Button>
						<h1 className="text-xl md:text-4xl">{heading}</h1>
					</div>
					<div className="flex gap-4">
						<ResetLabState buttonVariant="text" newLab={true}>
							<FaPlus /> New Lab
						</ResetLabState>
						<DarkModeSwitch
							handleOnChange={() => setDarkMode(!darkMode)}
							label=""
							id="darkModeSwitch"
							checked={darkMode}
						/>
					</div>
				</div>
			)}
			{children}
		</div>
	);
}
