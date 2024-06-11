import { Link } from "react-router-dom";
import config from "./config.json";

const Nav = (): JSX.Element => {
  const links: { to: string; label: string }[] = [
    { to: `${config.baseUrl}/wheel`, label: "Wheel" },
    { to: `${config.baseUrl}/vibecheck`, label: "Vibe Check" },
    { to: `${config.baseUrl}/people`, label: "People" },
  ];

  return (
    <nav className="sticky bg-gradient-to-r from-white from-20% via-primary via-85% to-secondary h-auto border-b-2 border-b-black top-0 z-10">
      <ul className="list-none">
        <li className="nav-link">
          <Link to={`${config.baseUrl}/`}>
            <img src={`${config.baseUrl}/aurora-logo.jpeg`} className="h-16 inline" alt="Aurora Team Logo" />
          </Link>
        </li>
        {links.map((link) => (
          <li key={link.to} className="nav-link">
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
