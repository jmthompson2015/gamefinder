/* eslint no-console: ["error", { allow: ["log"] }] */

import GameColumns from "../state/GameColumns.js";
import RangeFilter from "../state/RangeFilter.js";

import RangeFilterRow from "./RangeFilterRow.js";

const column = GameColumns[5]; // geekRating
const filter = RangeFilter.create({
  columnKey: column.key,
  minValue: 2,
  isMaxEnabled: true,
  maxValue: 12
});
const onChange = newFilter => {
  console.log(`onChange() newFilter = ${JSON.stringify(newFilter)}`);
};

const element = React.createElement(RangeFilterRow, {
  filter,
  onChange
});
ReactDOM.render(element, document.getElementById("panel"));
