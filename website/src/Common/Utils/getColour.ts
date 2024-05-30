import {
  red,
  volcano,
  orange,
  gold,
  lime,
  cyan,
  blue,
  purple,
  magenta,
} from "@ant-design/colors";

const colours = [
  red[6],
  blue[6],
  lime[6],
  magenta[6],
  purple[6],
  volcano[6],
  orange[6],
  gold[6],
  cyan[6],
];

const getColour = (idx?: number): string => {
  if (!idx) {
    return colours[Math.round(Math.random() * (colours.length - 1))];
  }
  while (idx > colours.length - 1) {
    idx -= colours.length;
  }

  return colours[idx];
};

export default getColour;
