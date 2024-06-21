import { Link } from "react-router-dom";
import { LabelledLink } from "../../types";

interface Props {
  label: string;
  children: LabelledLink[];
}

const DropdownMenu = ({ label, children }: Props): JSX.Element => {
  return (
    <>
      <div className="nav-link nav-dropdown-label cursor-pointer group inline-block group relative">
        {label}
        <div className="nav-dropdown group-hover:scale-100 w-[100px]">
          {children.map((childLink, idx) => (
            <Link key={idx} to={childLink.to} className="nav-link hover:bg-green-300">{childLink.label}</Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default DropdownMenu;
