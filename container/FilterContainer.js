import User from "../artifact/User.js";

import ActionCreator from "../state/ActionCreator.js";

import FilterUI from "../view/FilterUI.js";

const mapStateToProps = state => {
  const { categoryMap, designerMap, filters, mechanicMap } = state;
  const userMap = R.map(entity => R.assoc("count", 1, entity), User);

  return {
    filters,

    categoryMap,
    designerMap,
    mechanicMap,
    userMap
  };
};

const mapDispatchToProps = (dispatch /* , ownProps */) => ({
  applyOnClick: event => {
    // console.log("applyOnClick()");
    const { filters: filtersString } = event.currentTarget.dataset;
    const filters = JSON.parse(filtersString);
    // console.log(`applyOnClick() filters = ${JSON.stringify(filters)}`);
    dispatch(ActionCreator.setFilters(filters));
  },
  clearCacheOnClick: () => {
    // console.log("clearCacheOnClick()");
    localStorage.removeItem("filters");
  },
  removeOnClick: () => {
    // console.log("removeOnClick()");
    dispatch(ActionCreator.removeFilters());
  },
  restoreDefaultsOnClick: () => {
    // console.log("restoreDefaultsOnClick()");
    dispatch(ActionCreator.setDefaultFilters());
  }
});

export default ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterUI);
