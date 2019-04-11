import ASelector from "../artifact/Selector.js";

import EntitiesTable from "./EntitiesTable.js";

const CATEGORY_URL = "https://www.boardgamegeek.com/boardgamecategory/";
const categoryIds = [1001, 1002, 1008, 1009];
const categories = ASelector.categoriesByIds(categoryIds);
const element1 = React.createElement(EntitiesTable, { entities: categories, url: CATEGORY_URL });
ReactDOM.render(element1, document.getElementById("panel1"));

const DESIGNER_URL = "https://www.boardgamegeek.com/boardgamedesigner/";
const designerIds = [1, 2, 3, 4];
const designers = ASelector.designersByIds(designerIds);
const element2 = React.createElement(EntitiesTable, { entities: designers, url: DESIGNER_URL });
ReactDOM.render(element2, document.getElementById("panel2"));

const MECHANIC_URL = "https://www.boardgamegeek.com/boardgamemechanic/";
const mechanicIds = [2001, 2002, 2003, 2004];
const mechanics = ASelector.mechanicsByIds(mechanicIds);
const element3 = React.createElement(EntitiesTable, { entities: mechanics, url: MECHANIC_URL });
ReactDOM.render(element3, document.getElementById("panel3"));
