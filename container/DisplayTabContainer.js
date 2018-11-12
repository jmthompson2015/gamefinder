import ActionCreator from "../state/ActionCreator.js";

import DisplayTabs from "../view/DisplayTabs.js";

const mapStateToProps = state => {
  const { categoryMap, designerMap, filters, mechanicMap, userMap } = state;

  return {
    filters,

    categoryMap,
    designerMap,
    mechanicMap,
    userMap
  };
};

const mapDispatchToProps = dispatch => ({
  onChange: displayTab => {
    dispatch(ActionCreator.setDisplayTab(displayTab));
  }
});

export default ReactRedux.connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayTabs);
