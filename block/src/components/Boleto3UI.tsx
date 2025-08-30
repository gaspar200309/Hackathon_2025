import { useState } from "react";
import { useWriteContract, useReadContract } from "wagmi";
import Boleto3Artifact from "./Boleto3.json"; 

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 
const Boleto3ABI = Boleto3Artifact.abi; 

export default function Boleto3UI() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("0");

  // Leer balance
  const { data: balance } = useReadContract({
    abi: Boleto3ABI,
    address: CONTRACT_ADDRESS,
    functionName: "balanceOf",
    args: [to],
  });

  // Transferir tokens
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
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Boleto3 dApp</h2>

      <div>
        <input
          type="text"
          placeholder="Dirección destino"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Cantidad"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded ml-2"
        />
        <button
          onClick={transfer}
          className="bg-green-500 text-white px-4 py-2 rounded ml-2"
        >
          Transferir
        </button>
      </div>

      <p>Balance de {to}: {balance?.toString() ?? "0"} BOL3</p>
    </div>
  );
}
