import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "@wagmi/connectors";

export default function WalletLogin() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white shadow-md rounded-2xl w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Login con Wallet</h2>

      {isConnected ? (
        <div className="flex flex-col items-center space-y-4">
          <p className="text-gray-700 text-sm break-all">
            ✅ Conectado: <span className="font-mono">{address}</span>
          </p>
          <button
            onClick={() => disconnect()}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition"
          >
            Desconectar
          </button>
        </div>
      ) : (
        <div className="flex flex-col space-y-3 w-full">
          {connectors.map((connector) => (
            <button
              key={connector.uid}
              onClick={() => connect({ connector })}
              disabled={!connector.ready}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition disabled:bg-gray-400"
            >
              {connector.name}
              {isLoading && pendingConnector?.uid === connector.uid && " (Conectando...)"}
            </button>
          ))}

          {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
      )}
    </div>
  );
}
