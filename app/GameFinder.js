/* eslint no-console: ["error", { allow: ["log"] }] */

import Reducer from "../state/Reducer.js";
import Selector from "../state/Selector.js";

import GameLoader from "../model/GameLoader.js";

import FilterContainer from "../container/FilterContainer.js";
import GameTableContainer from "../container/GameTableContainer.js";
import ProgressContainer from "../container/ProgressContainer.js";

const store = Redux.createStore(Reducer.root);

GameLoader.load(store).then(() => {
  console.log(`myCallback() store.getState().isDataLoaded ? ${store.getState().isDataLoaded}`);

  if (Selector.isDataLoaded(store.getState())) {
    // Clear the progress area.
    const el = document.getElementById("progress");

    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }
});

const container0 = React.createElement(ProgressContainer);
const element0 = React.createElement(ReactRedux.Provider, { store }, container0);
ReactDOM.render(element0, document.getElementById("progress"));

const container1 = React.createElement(FilterContainer);
const element1 = React.createElement(ReactRedux.Provider, { store }, container1);
ReactDOM.render(element1, document.getElementById("filter"));

const container2 = React.createElement(GameTableContainer);
const element2 = React.createElement(ReactRedux.Provider, { store }, container2);
ReactDOM.render(element2, document.getElementById("gameTable"));
