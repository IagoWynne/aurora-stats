const calculateMean = (values: number[]): number | null =>
  values.length
    ? values.reduce((sum, value) => (sum += value), 0) / values.length
    : null;

export default calculateMean;
