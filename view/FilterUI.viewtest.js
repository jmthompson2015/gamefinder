/* eslint no-console: ["error", { allow: ["log"] }] */

import Category from "../artifact/Category.js";
import Designer from "../artifact/Designer.js";
import Mechanic from "../artifact/Mechanic.js";
import User from "../artifact/User.js";

import DefaultFilters from "../state/DefaultFilters.js";

import FilterUI from "./FilterUI.js";

const filters = DefaultFilters.create();
const applyOnClick = () => console.log("applyOnClick()");
const clearCacheOnClick = () => console.log("clearCacheOnClick()");
const removeOnClick = () => console.log("removeOnClick()");
const restoreDefaultsOnClick = () => console.log("restoreDefaultsOnClick()");

const categoryMap = R.map(entity => R.assoc("count", 1, entity), Category);
const designerMap = R.map(entity => R.assoc("count", 1, entity), Designer);
const mechanicMap = R.map(entity => R.assoc("count", 1, entity), Mechanic);
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
