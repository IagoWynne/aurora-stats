interface Props {
  score: number | null;
}

const AverageScore = ({ score }: Props): JSX.Element => {
  return <div>{score ? score.toFixed(2) : "-"}</div>;
};

export default AverageScore;
