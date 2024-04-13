import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/people"}>People</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
