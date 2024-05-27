import { HTMLProps, PropsWithChildren } from "react";

interface Props extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  title?: string;
}

const SectionContainer = ({ title, children, ...rest }: Props): JSX.Element => {
  return (
    <div className={`border-black border-2 p-2 m-1 mt-4 bg-white ${rest.className}`}>
      {title && <p className="font-bold mb-2">{title}</p>}
      {children}
    </div>
  );
};

export default SectionContainer;
