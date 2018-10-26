/* eslint no-console: ["error", { allow: ["log"] }] */

import GameDetail from "../artifact/GameDetail.js";
import User from "../artifact/User.js";

import DefaultFilters from "../state/DefaultFilters.js";
import EntityUtils from "../state/EntityUtilities.js";

import FilterUI from "./FilterUI.js";

const filters = DefaultFilters.create();
const applyOnClick = () => console.log("applyOnClick()");
const clearCacheOnClick = () => console.log("clearCacheOnClick()");
const removeOnClick = () => console.log("removeOnClick()");
const restoreDefaultsOnClick = () => console.log("restoreDefaultsOnClick()");

const gameDetails = Object.values(GameDetail);

const categoryMap = EntityUtils.createCategoryMap(gameDetails);
const designerMap = EntityUtils.createDesignerMap(gameDetails);
const mechanicMap = EntityUtils.createMechanicMap(gameDetails);
const userMap = R.map(entity => R.assoc("count", 1, entity), User);

const element = React.createElement(FilterUI, {
  filters,
  applyOnClick,
  clearCacheOnClick,
  removeOnClick,
  restoreDefaultsOnClick,

  categoryMap,
  designerMap,
  mechanicMap,
  userMap
});
ReactDOM.render(element, document.getElementById("panel"));
