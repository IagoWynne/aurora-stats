import { Suspense } from "react";
import { VibeCheckContextProvider } from "../../contexts/VibeCheckContext";
import { Loading, SectionContainer } from "../../../Common";
import AddVibeCheck from "../AddVibeCheck/AddVibeCheck";

const VibeCheck = (): JSX.Element => {
  return (
    <Suspense fallback={<Loading />}>
      <VibeCheckContextProvider>
        <AddVibeCheck />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "65%" }}>
            <SectionContainer title="This week's scores" />
          </div>
          <div style={{ width: "32%" }}>
            <SectionContainer title="This week's average" />
          </div>
        </div>
      </VibeCheckContextProvider>
    </Suspense>
  );
};

export default VibeCheck;
