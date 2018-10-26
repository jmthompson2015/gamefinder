import User from "../artifact/User.js";

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

export default ReactRedux.connect(mapStateToProps)(FilterUI);
