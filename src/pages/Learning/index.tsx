import Terminal from "../../components/Terminal";
import { BlobType } from "../../dataStructures";
import { useActionStatus, useSetActionStatus } from "../../hooks/useActionStatus";
import { useSharedLabs } from "../../hooks/useBlobs";
import { useSetLogs } from "../../hooks/useLogs";
import { axiosInstance } from "../../utils/axios-interceptors";

export default function Learning() {
    const { data: inProgress } = useActionStatus();
    const { mutate: setActionStatus } = useSetActionStatus();
    const { mutate: setLogs } = useSetLogs();
    const { data: blobs } = useSharedLabs();

    function deployHandler(blob: BlobType) {
        setActionStatus({ inProgress: true });
        setLogs({ isStreaming: true, logs: "" });
        axiosInstance.post("deploylab", blob);
    }

    //This function is called after deployHandler streaming ends.
    function breakHandler(blob: BlobType) {
        setActionStatus({ inProgress: true });
        setLogs({ isStreaming: true, logs: "" });
        axiosInstance.post("breaklab", blob);
    }

    function validateHandler(blob: BlobType) {
        setActionStatus({ inProgress: true });
        setLogs({ isStreaming: true, logs: "" });
        axiosInstance.post("validatelab", blob);
    }

    function destroyHandler(blob: BlobType) {
        setActionStatus({ inProgress: true });
        setLogs({ isStreaming: true, logs: "" });
        axiosInstance.post("destroy", blob);
    }

    return (
        <div className="my-3 mx-20 mb-2">
            {blobs && (
                <table className="table-flex border border-collapse border-slate-500 w-full mb-4">
                    <thead>
                        <tr>
                            <th className="py-1 px-4 border border-collapse border-slate-500">Template Name</th>
                            <th className="py-1 px-4 border border-collapse border-slate-500">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blobs.map((blob: any) => (
                            <tr key={blob.name}>
                                <td className="py-1 px-4 border border-collapse border-slate-500 ">{blob.name}</td>
                                <td className="py-1 px-4 border border-collapse border-slate-500 text-center space-x-2">
                                    <button
                                        className="bg-slate-500 py-1 px-5 rounded-2xl text-bold text-white hover:bg-slate-700 disabled:bg-slate-300"
                                        onClick={() => deployHandler(blob)}
                                        disabled={inProgress}
                                    >
                                        Deploy
                                    </button>{" "}
                                    <button
                                        className="bg-green-500 py-1 px-5 rounded-2xl text-bold text-white hover:bg-green-700 disabled:bg-slate-300"
                                        onClick={() => breakHandler(blob)}
                                        disabled={inProgress}
                                    >
                                        Break
                                    </button>{" "}
                                    <button
                                        className="bg-sky-500 py-1 px-5 rounded-2xl text-bold text-white hover:bg-sky-700 disabled:bg-slate-300"
                                        onClick={() => validateHandler(blob)}
                                        disabled={inProgress}
                                    >
                                        Validate
                                    </button>{" "}
                                    <button
                                        className="bg-red-500 py-1 px-5 rounded-2xl text-bold text-white hover:bg-red-700 disabled:bg-slate-300"
                                        onClick={() => destroyHandler(blob)}
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
