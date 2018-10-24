/* eslint no-console: ["error", { allow: ["log"] }] */

import Reducer from "../state/Reducer.js";

import FilterContainer from "./FilterContainer.js";

const store = Redux.createStore(Reducer.root);

const applyOnClick = () => console.log("applyOnClick()");
const clearCacheOnClick = () => console.log("clearCacheOnClick()");
const removeOnClick = () => console.log("removeOnClick()");
const restoreDefaultsOnClick = () => console.log("restoreDefaultsOnClick()");

const container = React.createElement(FilterContainer, {
  applyOnClick,
  clearCacheOnClick,
  removeOnClick,
  restoreDefaultsOnClick
});
const element = React.createElement(ReactRedux.Provider, { store }, container);

ReactDOM.render(element, document.getElementById("panel"));
