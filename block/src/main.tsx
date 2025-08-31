import ReactDOM from "react-dom/client";
import { WagmiProvider, createConfig, http } from "wagmi";
import App from './App'
import './index.css';
import { liskSepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const config = createConfig({
  chains: [liskSepolia],
  transports: {
    [liskSepolia.id]: http("https://rpc.sepolia-api.lisk.com"),
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
