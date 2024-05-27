import { HTMLProps, PropsWithChildren } from "react";

const ContainerContent = ({
  children,
  ...rest
}: PropsWithChildren<HTMLProps<HTMLDivElement>>): JSX.Element => (
  <div className={`p-2 h-full-section-container ${rest.className ? rest.className : ""}`} {...rest}>
    {children}
  </div>
);

export default ContainerContent;