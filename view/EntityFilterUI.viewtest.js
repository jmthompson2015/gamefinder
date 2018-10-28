/* eslint no-console: ["error", { allow: ["log"] }] */

import GameDetail from "../artifact/GameDetail.js";

import EntityFilter from "../state/EntityFilter.js";
import EntityUtils from "../state/EntityUtilities.js";

import EntityFilterUI from "./EntityFilterUI.js";

const gameDetails = Object.values(GameDetail);
const entityMap = EntityUtils.createCategoryMap(gameDetails);
const filter = EntityFilter.create({
  columnKey: "categories",
  values: [
    1002, // Card Game
    1016 // Science Fiction
  ]
});
const onChange = newFilter => {
  console.log(`onChange() newFilter = ${JSON.stringify(newFilter)}`);
};

const element = React.createElement(EntityFilterUI, {
  entityMap,
  filter,
  onChange
});
ReactDOM.render(element, document.getElementById("panel"));
