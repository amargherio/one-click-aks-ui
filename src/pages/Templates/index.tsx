import axios from "axios";
import {
    dangerOutlineButtonClassName,
    primaryButtonClassName,
    primaryOutlineButtonClassName,
    secondaryOutlineButtonClassName,
    successOutlineButtonClassName,
} from "../../components/Button";
import Terminal from "../../components/Terminal";
import { useActionStatus, useSetActionStatus } from "../../hooks/useActionStatus";
import { useSharedTemplates } from "../../hooks/useBlobs";
import { useSetLogs } from "../../hooks/useLogs";
import { axiosInstance } from "../../utils/axios-interceptors";

export default function Templates() {
    const { data: inProgress } = useActionStatus();
    const { mutate: setActionStatus } = useSetActionStatus();
    const { mutate: setLogs } = useSetLogs();
    const { data: blobs, isLoading } = useSharedTemplates();

    function actionHandler(url: string, action: string) {
        axios.get(url).then((response) => {
            setActionStatus({ inProgress: true });
            setLogs({ isStreaming: true, logs: "" });
            axiosInstance.post(`${action}`, response.data);
        });
    }

    function viewHandler(url: string) {
        axios.get(url).then((response) => {
            console.log(response.data);
            setLogs({ isStreaming: false, logs: JSON.stringify(response.data, null, 4) });
        });
    }

    if (isLoading) {
        return <h4>Loading...</h4>;
    }

    return (
        <div className="my-3 mx-20 mb-2">
            {blobs !== undefined && (
                <table className="table-flex rounded border border-slate-500 w-full mb-4">
                    <thead>
                        <tr>
                            <th className="py-1 px-4 border border-slate-500">Template Name</th>
                            <th className="py-1 px-4 border border-slate-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blobs.map((blob: any) => (
                            <tr key={blob.name}>
                                <td className="py-1 px-4 border border-slate-500 ">{blob.name}</td>
                                <td className="py-1 px-4 border border-slate-500 text-center space-x-2">
                                    <button
                                        className={secondaryOutlineButtonClassName}
                                        onClick={() => viewHandler(blob.url)}
                                        disabled={inProgress}
                                    >
                                        View
                                    </button>
                                    <button
                                        className={successOutlineButtonClassName}
                                        onClick={() => actionHandler(blob.url, "plan")}
                                        disabled={inProgress}
                                    >
                                        Plan
                                    </button>
                                    <button
                                        className={primaryOutlineButtonClassName}
                                        onClick={() => actionHandler(blob.url, "apply")}
                                        disabled={inProgress}
                                    >
                                        Apply
                                    </button>
                                    <button
                                        className={dangerOutlineButtonClassName}
                                        onClick={() => actionHandler(blob.url, "destroy")}
                                        disabled={inProgress}
                                    >
                                        Destroy
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <Terminal />
        </div>
    );
}
