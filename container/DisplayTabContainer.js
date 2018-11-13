import ActionCreator from "../state/ActionCreator.js";

import DisplayTabs from "../view/DisplayTabs.js";

const mapStateToProps = state => {
  const { displayTab } = state;

  return { selected: displayTab };
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
