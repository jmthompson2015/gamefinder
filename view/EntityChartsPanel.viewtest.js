import Category from "../artifact/Category.js";

import EntityChartsPanel from "./EntityChartsPanel.js";

const userToEntityToCount = {
  1: {
    1001: 4,
    1002: 3,
    1008: 2
  },
  2: {
    1001: 5,
    1002: 4,
    1008: 3
  },
  3: {
    1001: 6,
    1002: 5,
    1008: 4
  }
};

const element = React.createElement(EntityChartsPanel, {
  entityMap: Category,
  userToEntityToCount
});
ReactDOM.render(element, document.getElementById("panel"));
