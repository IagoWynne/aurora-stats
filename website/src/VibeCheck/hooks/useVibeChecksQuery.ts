import { useSuspenseQuery } from "@apollo/client";
import { GET_VIBE_CHECK_BETWEEN } from "../queries/getVibeCheckBetween";
import { VibeCheck, VibeCheckDTO, VibeCheckWeek } from "../types";
import { startOfWeek } from "date-fns";

const useVibeChecksQuery = (from: Date, to: Date): VibeCheckWeek[] => {
  const { data } = useSuspenseQuery<{ vibeChecks: VibeCheckDTO[] }>(
    GET_VIBE_CHECK_BETWEEN,
    {
      variables: {
        from: from.toISOString(),
        to: to.toISOString(),
      },
    }
  );

  return mapVibeChecksToWeeks(mapVibeChecksFromDTO(data.vibeChecks));
};

const mapVibeChecksFromDTO = (vibeChecks: VibeCheckDTO[]): VibeCheck[] =>
  vibeChecks.map((dto: VibeCheckDTO) => ({
    date: new Date(dto.date),
    scores: dto.scores,
    averageScore: dto.averageScore,
  }));

const mapVibeChecksToWeeks = (vibeChecks: VibeCheck[]): VibeCheckWeek[] => {
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
  prevDate.getDate() < startOfWeek(currentDate).getDate();

const newVibeCheckWeek = (date: Date): VibeCheckWeek => ({
  weekStart: startOfWeek(date),
  vibeChecks: [],
  weekAverage: 0,
});

const calculateAverageScore = (vibeChecks: VibeCheck[]): number =>
  vibeChecks.reduce(
    (total: number, vibeCheck: VibeCheck) => (total += vibeCheck.averageScore),
    0
  ) / vibeChecks.length;

export default useVibeChecksQuery;
