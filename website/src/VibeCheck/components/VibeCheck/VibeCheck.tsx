import { Suspense } from "react";
import { isMonday, previousMonday, startOfDay, addMinutes, endOfToday } from "date-fns";
import { VibeCheckContextProvider } from "../../contexts/VibeCheckContext";
import { Loading } from "../../../Common";
import AddVibeCheck from "../AddVibeCheck/AddVibeCheck";
import ScoreTableWithAverage from "../ScoreTableWithAverage";

const VibeCheck = (): JSX.Element => {
  const today = getTodayAtMidnightUTC();
  const weekStart = isMonday(today) ? today : new Date(previousMonday(today));

  return (
    <Suspense fallback={<Loading />}>
      <VibeCheckContextProvider>
        <AddVibeCheck today={today} weekStart={weekStart} />
        <Suspense>
          <ScoreTableWithAverage from={weekStart} to={endOfToday()} showFullStatsButton/>
        </Suspense>
      </VibeCheckContextProvider>
    </Suspense>
  );
};

// this is a right pain.
const getTodayAtMidnightUTC = (): Date => {
  // startOfDay sets time to 00:00:00 based on current timezone...
  // so when timezone is BST, the UTC is prev day at 23:00, which is not helpful
  const now = startOfDay(new Date());

  // get offset - this is how many minutes behind/ahead UTC is. In BST, this is -60 mins
  // we want to add that offset instead
  const minutesToAdd = -now.getTimezoneOffset();
  return addMinutes(now, minutesToAdd);
};

export default VibeCheck;
