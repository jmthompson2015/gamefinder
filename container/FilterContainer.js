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
  applyOnClick: () => {
    // console.log("applyOnClick()");
    dispatch(ActionCreator.applyFilters());
  },
  clearCacheOnClick: () => {
    // console.log("clearCacheOnClick()");
    localStorage.removeItem("filters");
  },
  onChange: filter => {
    // console.log("FilterContainer onChange()");
    dispatch(ActionCreator.setFilter(filter));
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
