import toast from "react-hot-toast";
import { SUPPORTED_NETWORKS } from "../constants/networks";
import useWallet from "../state/wallet/hooks/useWallet";

const useToast = () => {
  const { chainId } = useWallet();
  const chainIdStr = chainId
    ? `0x${chainId?.toString(16).toUpperCase()}`
    : "0x4";
  const txSuccess = (msg: string, tx: string) =>
    toast(
      (t) => (
        <span className="flex items-center font-bold">
          {msg}
          <button className="ml-1" onClick={() => toast.dismiss(t.id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <a
            className="ml-1"
            href={`${SUPPORTED_NETWORKS[chainIdStr].blockExplorerUrls[0]}/tx/${tx}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </span>
      ),
      {
        style: {
          background: "#3E7153",
          color: "white",
          fontWeight: "bold",
          border: "1px solid #F2F2F240",
          textOverflow: "ellipsis",
          overflow: "hidden",
        },
      }
    );
  const txWaiting = (msg: string) =>
    toast(
      (t) => (
        <div className="flex items-center font-bold">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {msg}
          <button className="ml-1" onClick={() => toast.dismiss(t.id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ),
      {
        style: {
          background: "#6A55EA",
          color: "white",
          fontWeight: "bold",
          border: "1px solid #6A55EA",
          textOverflow: "ellipsis",
          overflow: "hidden",
        },
        duration: 100000,
      }
    );
  const error = (msg: string) =>
    toast(
      (t) => (
        <span className="flex items-center font-bold">
          {msg}
          <button className="ml-1" onClick={() => toast.dismiss(t.id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </span>
      ),
      {
        style: {
          background: "#973838",
          color: "white",
          fontWeight: "bold",
          border: "1px solid #F2F2F240",
          textOverflow: "ellipsis",
          overflow: "hidden",
        },
      }
    );

  const dismiss = () => toast.dismiss();

  return {
    error,
    txSuccess,
    txWaiting,
    dismiss,
  };
};

export default useToast;
