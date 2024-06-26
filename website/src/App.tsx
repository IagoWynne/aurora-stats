import { Outlet } from "react-router-dom";
import Nav from "./Nav/components/Nav/Nav";

function App() {
  return (
    <div className="h-screen bg-gradient-to-tl from-secondary from-5% via-primary to-40% to-background overflow-y-auto">
      <Nav />
      <Outlet />
    </div>
  );
}

export default App;
