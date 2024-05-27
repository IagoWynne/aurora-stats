import { Link } from "react-router-dom";

const Nav = (): JSX.Element => {
  const links: { to: string; label: string }[] = [
    { to: "/wheel", label: "Wheel" },
    { to: "/vibecheck", label: "Vibe Check" },
    { to: "/people", label: "People" },
  ];

  return (
    <nav className="bg-gradient-to-l from-emerald-500 from-5% via-green-400 to-80% to-white h-auto border-b-2 border-b-black">
      <ul className="list-none">
        <li className="nav-link">
          <Link to="/">
            <img src="/aurora-logo.jpeg" className="h-16 inline" />
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
