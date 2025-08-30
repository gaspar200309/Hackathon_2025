import Header from "./components/header/Header";
import Boleto3UI from "./components/Boleto3UI";


export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <Boleto3UI />
      </div>
    </div>
  );
}


