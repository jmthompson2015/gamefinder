import Category from "../artifact/Category.js";
import Designer from "../artifact/Designer.js";
import Mechanic from "../artifact/Mechanic.js";
import User from "../artifact/User.js";

import FilterUI from "../view/FilterUI.js";

const mapStateToProps = state => {
  const categoryMap = R.map(entity => R.assoc("count", 1, entity), Category);
  const designerMap = R.map(entity => R.assoc("count", 1, entity), Designer);
  const mechanicMap = R.map(entity => R.assoc("count", 1, entity), Mechanic);
  const userMap = R.map(entity => R.assoc("count", 1, entity), User);

  return {
    filters: state.filters,

    categoryMap,
    designerMap,
    mechanicMap,
    userMap
  };
};

export default ReactRedux.connect(mapStateToProps)(FilterUI);
