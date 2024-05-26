import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  title?: string;
}

const SectionContainer = ({ title, children }: Props): JSX.Element => {
  return (
    <div>
      {title && <p>{title}</p>}
      {children}
    </div>
  );
};

export default SectionContainer;
