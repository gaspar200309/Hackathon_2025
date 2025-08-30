import { injected, useAccount, useConnect, useDisconnect } from "wagmi";

function Header() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <header className="bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-white p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">Boleto3</h1>
        </div>

        <div className="flex items-center space-x-4">
          {isConnected ? (
            <>
              <div className="bg-blue-500/20 px-4 py-2 rounded-full flex items-center">
                <div className="h-2 w-2 bg-green-400 rounded-full mr-2"></div>
                <span className="text-sm">{address?.slice(0, 6)}...{address?.slice(-4)}</span>
              </div>
              <button
                onClick={() => disconnect()}
                className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Desconectar
              </button>
            </>
          ) : (
            <button
              onClick={() => connect({ connector: injected() })}
              className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-md"
            >
              Conectar Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;