import { Link } from "react-router-dom";

const Nav = (): JSX.Element => {
  const links: { to: string; label: string }[] = [
    { to: "/wheel", label: "Wheel" },
    { to: "/vibecheck", label: "Vibe Check" },
    { to: "/people", label: "People" },
  ];

  return (
    <nav>
      <Link to="/">
        <img src="/aurora-logo.jpeg" height="51px" />
      </Link>
      <ul>
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
