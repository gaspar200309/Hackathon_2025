import ReactDOM from "react-dom/client";
import { WagmiProvider, createConfig, http } from "wagmi";
import App from './App'
import './index.css';
import { hardhat } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const config = createConfig({
  chains: [hardhat], 
  transports: {
    [hardhat.id]: http("http://127.0.0.1:8545"), // RPC de Hardhat local
  },
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </WagmiProvider>
);
