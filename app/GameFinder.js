/* eslint no-console: ["error", { allow: ["log"] }] */

import ActionCreator from "../state/ActionCreator.js";
import Observer from "../state/Observer.js";
import Reducer from "../state/Reducer.js";
import Selector from "../state/Selector.js";

import GameLoader from "../model/GameLoader.js";

import DisplayTabContainer from "../container/DisplayTabContainer.js";
import EntityChartsContainer from "../container/EntityChartsContainer.js";
import ProgressContainer from "../container/ProgressContainer.js";

import TableColumns from "./TableColumns.js";

const store = Redux.createStore(Reducer.root);
let frt;

GameLoader.load(store).then(() => {
  console.log(
    `myCallback() store.getState().isDataLoaded ? ${
      store.getState().isDataLoaded
    }`
  );

  if (Selector.isDataLoaded(store.getState())) {
    // Clear the progress area.
    const el = document.getElementById("progress");

    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }

    // Add the filter and table.
    const { tableRows } = store.getState();
    const appName = "GameFinder";
    const onFilterChange = (filteredTableRows) => {
      console.log(
        `onFilterChange() filteredTableRows.length = ${filteredTableRows.length}`
      );
    };
    const onShowColumnChange = (columnToChecked) => {
      console.log(
        `onShowColumnChange() columnToChecked = ${JSON.stringify(
          columnToChecked
        )}`
      );
    };
    const isVerbose = true;
    frt = new FilteredReactTable(
      TableColumns,
      tableRows,
      appName,
      onFilterChange,
      onShowColumnChange,
      isVerbose
    );
    store.dispatch(ActionCreator.setFilteredReactTable(frt));

    const className = undefined;
    const headerClass = "f5 gf-bg-light1 ph1 pt1 tl";
    ReactDOM.render(
      frt.filterPanel("Filters", className, headerClass),
      document.getElementById("filter")
    );
    ReactDOM.render(
      frt.showColumnsPanel("Columns", className, headerClass),
      document.getElementById("showColumns")
    );
    ReactDOM.render(frt.tableElement(), document.getElementById("tabPanel"));
  }
});

const container0 = React.createElement(ProgressContainer);
const element0 = React.createElement(
  ReactRedux.Provider,
  { store },
  container0
);
ReactDOM.render(element0, document.getElementById("progress"));

const container2 = React.createElement(DisplayTabContainer);
const element2 = React.createElement(
  ReactRedux.Provider,
  { store },
  container2
);
ReactDOM.render(element2, document.getElementById("displayTabs"));

const renderDisplayTab = () => {
  const { displayTab } = store.getState();

  if (displayTab === "Game Table") {
    if (frt !== undefined) {
      ReactDOM.render(frt.tableElement(), document.getElementById("tabPanel"));
    }
  } else {
    const container3 = React.createElement(EntityChartsContainer, {
      entityName: displayTab,
    });
    const element3 = React.createElement(
      ReactRedux.Provider,
      { key: displayTab, store },
      container3
    );
    ReactDOM.render(element3, document.getElementById("tabPanel"));
  }
};

const select = (state) => state.displayTab;
Observer.observeStore(store, select, renderDisplayTab);
