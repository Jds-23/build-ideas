/**
 * Returns a string of form "abc...xyz"
 * @param {string} str string to string
 * @param {number} n number of chars to keep at front/end
 * @returns {string}
 */
export const getEllipsisTxt = (str: string, n = 6) => {
  if (str) {
    return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
  }
  return "";
};

export function nFormatter(num: number, digits: number | undefined) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
}

export function getDate(date: Date) {
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Aug",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${date.getUTCDate()} ${
    month[date.getUTCMonth()]
  } ${date.getUTCFullYear()}`;
}

const svgPartOne =
  '<svg xmlns="http://www.w3.org/2000/svg" width="270" height="270" fill="none"><path fill="url(#B)" d="M0 0h270v270H0z"/><defs><path d="M72.863 42.949c-.668-.387-1.426-.59-2.197-.59s-1.529.204-2.197.59l-10.081 6.032-6.85 3.934-10.081 6.032c-.668.387-1.426.59-2.197.59s-1.529-.204-2.197-.59l-8.013-4.721a4.52 4.52 0 0 1-1.589-1.616c-.384-.665-.594-1.418-.608-2.187v-9.31c-.013-.775.185-1.538.572-2.208a4.25 4.25 0 0 1 1.625-1.595l7.884-4.59c.668-.387 1.426-.59 2.197-.59s1.529.204 2.197.59l7.884 4.59a4.52 4.52 0 0 1 1.589 1.616c.384.665.594 1.418.608 2.187v6.032l6.85-4.065v-6.032c.013-.775-.185-1.538-.572-2.208a4.25 4.25 0 0 0-1.625-1.595L41.456 24.59c-.668-.387-1.426-.59-2.197-.59s-1.529.204-2.197.59l-14.864 8.655a4.25 4.25 0 0 0-1.625 1.595c-.387.67-.585 1.434-.572 2.208v17.441c-.013.775.185 1.538.572 2.208a4.25 4.25 0 0 0 1.625 1.595l14.864 8.655c.668.387 1.426.59 2.197.59s1.529-.204 2.197-.59l10.081-5.901 6.85-4.065 10.081-5.901c.668-.387 1.426-.59 2.197-.59s1.529.204 2.197.59l7.884 4.59a4.52 4.52 0 0 1 1.589 1.616c.384.665.594 1.418.608 2.187v9.311c.013.775-.185 1.538-.572 2.208a4.25 4.25 0 0 1-1.625 1.595l-7.884 4.721c-.668.387-1.426.59-2.197.59s-1.529-.204-2.197-.59l-7.884-4.59a4.52 4.52 0 0 1-1.589-1.616c-.385-.665-.594-1.418-.608-2.187v-6.032l-6.85 4.065v6.032c-.013.775.185 1.538.572 2.208a4.25 4.25 0 0 0 1.625 1.595l14.864 8.655c.668.387 1.426.59 2.197.59s1.529-.204 2.197-.59l14.864-8.655c.657-.394 1.204-.95 1.589-1.616s.594-1.418.609-2.187V55.538c.013-.775-.185-1.538-.572-2.208a4.25 4.25 0 0 0-1.625-1.595l-14.993-8.786z" fill="#fff"/></defs><defs><linearGradient id="B" x1="0" y1="0" x2="270" y2="270" gradientUnits="userSpaceOnUse"><stop stop-color="color-1-here"/><stop offset="1" stop-color="color-2-here" /></linearGradient></defs><text x="22.5" y="241" font-size="22" fill="#fff"  font-family="Plus Jakarta Sans,DejaVu Sans,Noto Color Emoji,Apple Color Emoji,sans-serif" font-weight="bold">';
const svgPartTwo = "</text></svg>";
function getColorFromArray(str: string): string[] {
  var colors1 = [
    "#ee9ca7",
    "#42275a",
    "#bdc3c7",
    "#de6262",
    "#06beb6",
    "#eb3349",
    "#dd5e89",
    "#56ab2f",
    "#614385",
    "#eecda3",
    "#eacda3",
    "#02aab0",
    "#d66d75",
    "#000428",
    "#ddd6f3",
    "#7b4397",
    "#43cea2",
    "#ba5370",
    "#ff512f",
    "#4568dc",
    "#ec6f66",
    "#ffd89b",
    "#3a1c71",
    "#4ca1af",
    "#ff5f6d",
    "#36d1dc",
    "#c33764",
    "#141e30",
    "#ff7e5f",
    "#ed4264",
    "#2b5876",
    "#ff9966",
    "#aa076b",
  ];
  var colors2 = [
    "#ffdde1",
    "#734b6d",
    "#2c3e50",
    "#ffb88c",
    "#48b1bf",
    "#f45c43",
    "#f7bb97",
    "#a8e063",
    "#516395",
    "#ef629f",
    "#d6ae7b",
    "#00cdac",
    "#e29587",
    "#004e92",
    "#faaca8",
    "#dc2430",
    "#185a9d",
    "#f4e2d8",
    "#dd2476",
    "#b06ab3",
    "#f3a183",
    "#19547b",
    "#d76d77",
    "#c4e0e5",
    "#ffc371",
    "#5b86e5",
    "#1d2671",
    "#243b55",
    "#feb47b",
    "#ffedbc",
    "#4e4376",
    "#ff5e62",
    "#61045f",
  ];

  var hash = 0;
  if (str.length === 0) return ["#fff", "#000"];
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  hash = ((hash % colors1.length) + colors1.length) % colors1.length;
  return [colors1[hash], colors2[hash]];
}
export function generatedNft(str: string) {
  const colors = getColorFromArray(str);
  const svgStr =
    svgPartOne
      .replace("color-1-here", colors[0])
      .replace("color-2-here", colors[1]) + svgPartTwo;
  return `data:image/svg+xml;base64,${btoa(svgStr)}`;
}
