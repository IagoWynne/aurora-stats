import { Link } from "react-router-dom";
import config from "../../../config.json";
import { LINKS } from "../../../Common";
import { LinkWithChildren } from "../../types";
import { DropdownMenu } from "../DropdownMenu";

const Nav = (): JSX.Element => {
  const links: LinkWithChildren[] = [
    { to: LINKS.standUpWheel, label: "Wheel" },
    { to: LINKS.vibeCheck, label: "Vibe Check" },
    {
      label: "Stats",
      children: [
        { to: LINKS.wheelStats, label: "Wheel" },
        { to: LINKS.vibeCheckStats, label: "Vibe Check" },
      ],
    },
    { to: LINKS.admin, label: "Admin" },
  ];

  return (
    <nav className="sticky bg-gradient-to-r from-white from-20% via-primary via-85% to-secondary h-auto border-b-2 border-b-black top-0 z-20">
      <div className="flex justify-start items-stretch">
        <Link to={LINKS.home}>
          <img
            src={`${config.baseUrl}/aurora-logo.jpeg`}
            className="h-16 inline"
            alt="Aurora Team Logo"
          />
        </Link>
        {links.map((link) => link.to ? (
            <Link to={link.to} className="nav-link">{link.label}</Link>
        ) : <DropdownMenu label={link.label} children={link.children || []} />)}
      </div>
      {/* <ul className="list-none">
        <li className="nav-link">
          <Link to={LINKS.home}>
            <img
              src={`${config.baseUrl}/aurora-logo.jpeg`}
              className="h-16 inline"
              alt="Aurora Team Logo"
            />
          </Link>
        </li>
        {links.map((link) => link.to ? (
          <li key={link.to} className="nav-link">
            <Link to={link.to}>{link.label}</Link>
          </li>
        ) : <DropdownMenu label={link.label} children={link.children || []} />)}
      </ul> */}
    </nav>
  );
};

export default Nav;
