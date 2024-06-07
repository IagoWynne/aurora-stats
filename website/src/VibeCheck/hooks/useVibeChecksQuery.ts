import { useSuspenseQuery } from "@apollo/client";
import { GET_VIBE_CHECK_BETWEEN } from "../queries/getVibeCheckBetween";
import { VibeCheck, VibeCheckDTO, VibeCheckWeek } from "../types";
import {
  addDays,
  formatDate,
  isMonday,
  isSaturday,
  isSunday,
  previousMonday,
  startOfWeek,
} from "date-fns";

const useVibeChecksQuery = (
  from: Date,
  to: Date
): { vibeChecks: VibeCheck[]; vibeCheckWeeks: VibeCheckWeek[] } => {
  const { data } = useSuspenseQuery<{ vibeChecks: VibeCheckDTO[] }>(
    GET_VIBE_CHECK_BETWEEN,
    {
      variables: {
        from: from.toISOString(),
        to: to.toISOString(),
      },
    }
  );

  const vibeChecks = mapVibeChecksFromDTO(data.vibeChecks);
  const statsVibeChecks = fillMissingVibeCheckDates(vibeChecks);

  return {
    vibeChecks: statsVibeChecks,
    vibeCheckWeeks: mapVibeChecksToWeeks(vibeChecks),
  };
};

const mapVibeChecksFromDTO = (vibeChecks: VibeCheckDTO[]): VibeCheck[] =>
  vibeChecks.map((dto: VibeCheckDTO) => ({
    date: new Date(dto.date),
    scores: dto.scores,
    averageScore: dto.averageScore,
    formattedDate: formatDate(new Date(dto.date), "dd/MM/yyyy"),
  }));

const fillMissingVibeCheckDates = (vibeChecks: VibeCheck[]): VibeCheck[] => {
  if (!vibeChecks.length) {
    return [];
  }

  const dateArray: Date[] = [];

  let currentDate = vibeChecks[0].date;
  while (currentDate <= vibeChecks[vibeChecks.length - 1].date) {
    if (!isSunday(currentDate) && !isSaturday(currentDate)) {
      dateArray.push(new Date(currentDate));
    }

    currentDate = addDays(currentDate, 1);
  }

  const statsVibeChecks: VibeCheck[] = dateArray.map((date: Date) => {
    const formattedDate = formatDate(date, "dd/MM/yyyy");
    const vibeCheck = vibeChecks.find(
      (vc) => vc.formattedDate === formattedDate
    );

    if (vibeCheck) {
      return vibeCheck;
    }

    return {
      date,
      formattedDate,
      scores: [],
      averageScore: null,
    };
  });

  return statsVibeChecks;
};

const mapVibeChecksToWeeks = (vibeChecks: VibeCheck[]): VibeCheckWeek[] => {
  if (!vibeChecks.length) {
    return [];
  }

  let vibeCheckWeeks: VibeCheckWeek[] = [];

  let vcWeek = newVibeCheckWeek(vibeChecks[0].date);

  for (let i = 0; i < vibeChecks.length; i++) {
    if (i > 0) {
      if (isNewWeek(vibeChecks[i - 1].date, vibeChecks[i].date)) {
        vibeCheckWeeks.push(vcWeek);
        vcWeek = newVibeCheckWeek(vibeChecks[i].date);
      }
    }

    vcWeek.vibeChecks.push(vibeChecks[i]);
  }
  vibeCheckWeeks.push(vcWeek);

  vibeCheckWeeks = [
    ...vibeCheckWeeks.map((vcw) => ({
      ...vcw,
      weekAverage: calculateAverageScore(vcw.vibeChecks),
    })),
  ];

  return vibeCheckWeeks;
};

const isNewWeek = (prevDate: Date, currentDate: Date) =>
  prevDate.getTime() < startOfWeek(currentDate).getTime();

const newVibeCheckWeek = (date: Date): VibeCheckWeek => ({
  weekStart: isMonday(date) ? date : previousMonday(date),
  vibeChecks: [],
  weekAverage: 0,
});

const calculateAverageScore = (vibeChecks: VibeCheck[]): number =>
  vibeChecks.reduce(
    (total: number, vibeCheck: VibeCheck) =>
      vibeCheck.averageScore ? (total += vibeCheck.averageScore) : total,
    0
  ) / vibeChecks.filter((vibeCheck) => vibeCheck.averageScore !== null).length;

export default useVibeChecksQuery;
