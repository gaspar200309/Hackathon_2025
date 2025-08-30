import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "@wagmi/connectors"; 
import WalletLogin from './WalletLogin'
import Boleto3UI from './components/Boleto3UI'
import './index.css'

export default function App() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();

  const { disconnect } = useDisconnect();

  return (
    <div className="p-6">
      {isConnected ? (
        <>
          <p>✅ Conectado: {address}</p>
          <button
            onClick={() => disconnect()}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Desconectar
          </button>
        </>
      ) : (
        <button
          onClick={() => connect({ connector: injected() })} 
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Conectar Wallet
        </button>
      )}
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Boleto3UI/>
    </div>
    </div>
  );
}
