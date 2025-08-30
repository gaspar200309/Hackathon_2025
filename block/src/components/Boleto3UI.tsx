import { useState } from "react";
import { useWriteContract, useReadContract } from "wagmi";
import Boleto3Artifact from "./Boleto3.json"; 

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 
const Boleto3ABI = Boleto3Artifact.abi; 

function Boleto3UI() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("0");
  const [activeTab, setActiveTab] = useState("transfer");

  const { data: balance } = useReadContract({
    abi: Boleto3ABI,
    address: CONTRACT_ADDRESS,
    functionName: "balanceOf",
    args: [to],
  });

  const { writeContract } = useWriteContract();

  const transfer = () => {
    writeContract({
      abi: Boleto3ABI,
      address: CONTRACT_ADDRESS,
      functionName: "transfer",
      args: [to, BigInt(amount) * 10n ** 18n],
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tarjeta principal */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header de la tarjeta */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
          <h2 className="text-2xl font-bold">Plataforma Boleto3</h2>
          <p className="opacity-90">Sistema de transporte con pagos digitales basado en blockchain</p>
        </div>

        {/* Navegación por pestañas */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab("transfer")}
              className={`py-4 px-6 text-center font-medium ${activeTab === "transfer" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            >
              Transferencias
            </button>
            <button
              onClick={() => setActiveTab("balance")}
              className={`py-4 px-6 text-center font-medium ${activeTab === "balance" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            >
              Consultar Saldo
            </button>
            <button
              onClick={() => setActiveTab("qr")}
              className={`py-4 px-6 text-center font-medium ${activeTab === "qr" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            >
              Generar QR
            </button>
          </nav>
        </div>

        {/* Contenido de las pestañas */}
        <div className="p-6">
          {activeTab === "transfer" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Transferir tokens BOL3</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dirección destino</label>
                  <input
                    type="text"
                    placeholder="0x..."
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad BOL3</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  />
                </div>
              </div>
              <button
                onClick={transfer}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:-translate-y-0.5 shadow-md"
              >
                Transferir Tokens
              </button>
            </div>
          )}

          {activeTab === "balance" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Consultar saldo</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección wallet</label>
                <input
                  type="text"
                  placeholder="0x..."
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                />
              </div>
              {balance !== undefined && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <p className="text-sm text-blue-800 font-medium">Saldo de {to.slice(0, 8)}...{to.slice(-6)}:</p>
                  <p className="text-2xl font-bold text-blue-900 mt-1">{balance?.toString() ?? "0"} BOL3</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "qr" && (
            <div className="space-y-6 text-center">
              <h3 className="text-lg font-semibold text-gray-800">Generar código QR de pago</h3>
              <div className="bg-gray-100 p-8 rounded-lg inline-block">
                <div className="bg-white p-4 rounded-md inline-block">
                  <svg className="w-40 h-40" viewBox="0 0 100 100">
                    <rect x="0" y="0" width="100" height="100" fill="white" />
                    <rect x="10" y="10" width="10" height="10" fill="black" />
                    <rect x="30" y="10" width="10" height="10" fill="black" />
                    <rect x="50" y="10" width="10" height="10" fill="black" />
                    <rect x="70" y="10" width="10" height="10" fill="black" />
                    <rect x="10" y="30" width="10" height="10" fill="black" />
                    <rect x="30" y="30" width="10" height="10" fill="black" />
                    <rect x="50" y="30" width="10" height="10" fill="black" />
                    <rect x="70" y="30" width="10" height="10" fill="black" />
                    <rect x="10" y="50" width="10" height="10" fill="black" />
                    <rect x="30" y="50" width="10" height="10" fill="black" />
                    <rect x="50" y="50" width="10" height="10" fill="black" />
                    <rect x="70" y="50" width="10" height="10" fill="black" />
                    <rect x="10" y="70" width="10" height="10" fill="black" />
                    <rect x="30" y="70" width="10" height="10" fill="black" />
                    <rect x="50" y="70" width="10" height="10" fill="black" />
                    <rect x="70" y="70" width="10" height="10" fill="black" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-gray-600">Escanea este código QR para realizar un pago rápido</p>
              <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:-translate-y-0.5 shadow-md">
                Generar Nuevo Código
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tarjetas de información */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-2">Pagos Rápidos</h3>
          <p className="text-gray-600">Realiza pagos instantáneos sin contacto con tecnología blockchain.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-2">Seguridad</h3>
          <p className="text-gray-600">Transacciones seguras y transparentes con contratos inteligentes auditados.</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-lg mb-2">Para Todos</h3>
          <p className="text-gray-600">Sistema inclusivo que no requiere cuenta bancaria tradicional.</p>
        </div>
      </div>
    </div>
  );
}

export default Boleto3UI;