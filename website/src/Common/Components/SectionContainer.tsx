import { HTMLProps, PropsWithChildren } from "react";

interface Props extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  title?: string;
}

const SectionContainer = ({ title, children, ...rest }: Props): JSX.Element => {
  return (
    <div
      className={`border-slate-800 border-[1px] m-1 bg-slate-100 ${rest.className ? rest.className : ""}`}
    >
      {title && (
        <div className="bg-slate-800 text-white p-2">
          <p className="font-bold">{title}</p>
        </div>
      )}
      {children}
    </div>
  );
};

export default SectionContainer;
