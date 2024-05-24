import { Suspense } from "react";
import { VibeCheckContextProvider } from "../../contexts/VibeCheckContext";
import { Loading } from "../../../Common";
import AddVibeCheck from "./AddVibeCheck";

const VibeCheck = (): JSX.Element => {
  return (
    <Suspense fallback={<Loading />}>
      <VibeCheckContextProvider>
        <AddVibeCheck />
      </VibeCheckContextProvider>
    </Suspense>
  );
};

export default VibeCheck;
