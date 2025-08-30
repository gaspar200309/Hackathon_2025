import { useState } from "react";
import { useWriteContract, useReadContract, useAccount } from "wagmi";
import Boleto3Artifact from "./Boleto3.json";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const Boleto3ABI = Boleto3Artifact.abi;

function Boleto3UI() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("0");
  const [activeTab, setActiveTab] = useState("transfer");
  const { address, isConnected } = useAccount();

  // 🔹 Consultar el saldo del usuario conectado
  const { data: myBalance } = useReadContract({
    abi: Boleto3ABI,
    address: CONTRACT_ADDRESS,
    functionName: "balanceOf",
    args: [address],
  });

  // 🔹 Consultar saldo de cualquier dirección
  const { data: balance } = useReadContract({
    abi: Boleto3ABI,
    address: CONTRACT_ADDRESS,
    functionName: "balanceOf",
    args: [to || address],
  });

  const { writeContract, isPending } = useWriteContract();

  // 🔹 Transferencia de tokens
  const transfer = () => {
    if (!to || amount === "0") return;
    writeContract({
      abi: Boleto3ABI,
      address: CONTRACT_ADDRESS,
      functionName: "transfer",
      args: [to, BigInt(amount) * 10n ** 18n],
    });
  };

  // 🔹 Formato del saldo
  const formatBalance = (bal: any) => {
    if (!bal) return "0";
    return (Number(bal) / 1e18).toFixed(2);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header principal */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg p-6 mb-6 flex justify-between items-center text-white">
        <div>
          <h2 className="text-2xl font-bold">Plataforma Boleto3</h2>
          <p className="opacity-80 text-sm">
            Transporte urbano con pagos digitales sobre blockchain
          </p>
        </div>
        {isConnected && (
          <div className="bg-white/10 px-4 py-2 rounded-lg text-right">
            <p className="text-sm opacity-80">Mi saldo:</p>
            <p className="text-xl font-bold">
              {formatBalance(myBalance)} BOL3
            </p>
          </div>
        )}
      </div>

      {/* Navegación por pestañas */}
      <div className="border-b border-gray-600 mb-6">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab("transfer")}
            className={`py-3 px-6 font-medium ${
              activeTab === "transfer"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            Transferencias
          </button>
          <button
            onClick={() => setActiveTab("balance")}
            className={`py-3 px-6 font-medium ${
              activeTab === "balance"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            Consultar Saldo
          </button>
          <button
            onClick={() => setActiveTab("qr")}
            className={`py-3 px-6 font-medium ${
              activeTab === "qr"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            Generar QR
          </button>
        </nav>
      </div>

      {/* Contenido dinámico */}
      <div className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl shadow-lg p-6 text-white">
        {activeTab === "transfer" && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Transferir tokens BOL3</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Dirección destino (0x...)"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg"
              />
              <input
                type="number"
                placeholder="Cantidad"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg"
              />
            </div>
            <button
              onClick={transfer}
              disabled={isPending || !to || amount === "0"}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-6 py-3 rounded-lg font-medium shadow-md"
            >
              {isPending ? "Procesando..." : "Transferir Tokens"}
            </button>
          </div>
        )}

        {activeTab === "balance" && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Consultar saldo</h3>
            <input
              type="text"
              placeholder="Dirección wallet (o deja vacío)"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg"
            />
            {balance !== undefined && (
              <div className="bg-blue-500/20 p-4 rounded-lg border border-blue-500/30">
                <p className="text-sm">
                  Saldo de{" "}
                  {to
                    ? `${to.slice(0, 6)}...${to.slice(-4)}`
                    : "tu wallet"}:
                </p>
                <p className="text-2xl font-bold">
                  {formatBalance(balance)} BOL3
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "qr" && (
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold">Código QR para recibir pagos</h3>
            <div className="bg-white p-6 rounded-lg inline-block">
              <div className="w-40 h-40 bg-gray-900"></div>
              {/* Aquí después puedes integrar librerías como react-qr-code */}
            </div>
            <p className="text-sm text-gray-400">
              Dirección: {address || "Conecta tu wallet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Boleto3UI;
