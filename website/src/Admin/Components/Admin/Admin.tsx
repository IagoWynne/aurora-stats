import { Suspense } from "react";
import { ContainerContent, Loading, SectionContainer } from "../../../Common";
import { People } from "../People";
import { WheelOptions } from "../Wheel";

const Admin = (): JSX.Element => {
  return (
    <div className="flex justify-between items-stretch ">
      <SectionContainer title="People" className="basis-1/2">
        <ContainerContent>
          <Suspense fallback={<Loading />}>
            <People />
          </Suspense>
        </ContainerContent>
      </SectionContainer>
      <SectionContainer title="Wheel Options" className="basis-1/2">
        <ContainerContent>
          <Suspense fallback={<Loading />}>
            <WheelOptions />
          </Suspense>
        </ContainerContent>
      </SectionContainer>
    </div>
  );
};

export default Admin;
