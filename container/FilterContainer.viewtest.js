/* eslint no-console: ["error", { allow: ["log"] }] */

import GameDetail from "../artifact/GameDetail.js";

import ActionCreator from "../state/ActionCreator.js";
import Reducer from "../state/Reducer.js";

import FilterContainer from "./FilterContainer.js";

const gameDetails = Object.values(GameDetail);

const store = Redux.createStore(Reducer.root);
store.dispatch(ActionCreator.addGameDetails(gameDetails));

const container = React.createElement(FilterContainer);
const element = React.createElement(ReactRedux.Provider, { store }, container);

ReactDOM.render(element, document.getElementById("panel"));
