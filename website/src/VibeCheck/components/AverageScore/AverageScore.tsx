interface Props {
  score: number | null;
  textSize?: string;
}

const AverageScore = ({ score, textSize }: Props): JSX.Element => {
  const getBgColourClass = (): string => {
    if (score === null) {
      return "bg-transparent";
    }

    if (score < 2) {
      return "bg-red-300";
    }

    if (score < 4) {
      return "bg-orange-300";
    }

    if (score < 6) {
      return "bg-amber-300";
    }

    if (score < 8) {
      return "bg-lime-300";
    }

    return "bg-green-300";
  };

  const getTextSize = (): string => textSize ? `text-${textSize}` : "text-5xl";

  return (
    <div className={`flex flex-col h-full justify-center ${getBgColourClass()}`}>
      <div className={`text-center ${getTextSize()}`}>
        {score ? score.toFixed(2) : "-"}
      </div>
    </div>
  );
};

export default AverageScore;
