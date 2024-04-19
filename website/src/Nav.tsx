import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";
import { WHITE, AURORA_LIGHT_GREEN, AURORA_DARK_GREEN } from "./COLOURS";

const useStyles = createUseStyles({
  nav: {
    background:
      `linear-gradient(27deg, ${WHITE} 15%, ${AURORA_LIGHT_GREEN} 70%, ${AURORA_DARK_GREEN} 100%);`,
    display: "flex",
    justifyContent: "center",
    padding: 0,
    color: "#000",
    borderBottom: "2px solid black",
  },
  logo: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  menu: {
    listStyle: "none",
  },
  menuItem: {
    display: "inline",
    margin: "0 1rem",
    fontWeight: "bold",
    "& a": {
      color: "#000",
      textDecoration: "none",
    //   "&:hover": {
    //     color: "#123424",
    //   },
    },
  },
});

const Nav = (): JSX.Element => {
  const styles = useStyles();

  const links: { to: string; label: string }[] = [
    { to: "/wheel", label: "Wheel"},
    { to: "/fingeronthepulse", label: "Finger on the Pulse"},
    { to: "/people", label: "People" },
  ];

  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.logo}>
        <img src="/aurora-logo.jpeg" height="51px" />
      </Link>
      <ul className={styles.menu}>
        {links.map((link) => (
          <li className={styles.menuItem} key={link.to}>
            <Link to={link.to}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
