import Category from "../artifact/Category.js";

import EntityChart from "./EntityChart.js";

const entityToCount = {
  1001: 4,
  1002: 3,
  1008: 2
};

const element = React.createElement(EntityChart, { entityMap: Category, entityToCount });
ReactDOM.render(element, document.getElementById("panel"));
