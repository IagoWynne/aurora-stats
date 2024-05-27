import { Outlet } from "react-router-dom";
import Nav from "./Nav";

function App() {
  return (
    <div className="h-screen bg-gradient-to-tl from-emerald-500 from-5% via-green-400 to-40% to-white">
      <Nav />
      <Outlet />
    </div>
  );
}

export default App;
