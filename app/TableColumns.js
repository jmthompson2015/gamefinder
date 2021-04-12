import EntitiesTable from "../view/EntitiesTable.js";

import Formatter from "./Formatter.js";

const { ColumnUtilities: CU } = FilteredReactTable;

const DESIGNER_URL = "https://www.boardgamegeek.com/boardgamedesigner/";
const CATEGORY_URL = "https://www.boardgamegeek.com/boardgamecategory/";
const MECHANIC_URL = "https://www.boardgamegeek.com/boardgamemechanic/";

const createEntitiesTable = (entities, url) =>
  React.createElement(EntitiesTable, { entities, url });

const mapUsers = (users) => {
  const mapFunction = (user) => {
    const src = `../resource/${user.name}.png`;
    const href = `https://www.boardgamegeek.com/collection/user/${user.name}`;

    return CU.createImageLink(src, href, user.name);
  };
  const cells = R.map(mapFunction, R.sortBy(R.prop("name"), users));

  return ReactDOMFactories.span({ className: "widthFull" }, cells);
};

const TableColumns = [
  {
    key: "usernames",
    label: "Owner",
    type: "string",
    className: "displayInlineBlock",
    valueFunction: (row) => Formatter.formatEntities(row.usernames),
    cellFunction: (row) =>
      row.usernames !== undefined ? mapUsers(row.usernames) : undefined,
  },
  {
    key: "wishers",
    label: "Wishlist",
    type: "string",
    className: "displayInlineBlock",
    valueFunction: (row) => Formatter.formatEntities(row.wishers),
    cellFunction: (row) =>
      row.wishers !== undefined ? mapUsers(row.wishers) : undefined,
  },
  {
    key: "boardGameRank",
    label: "Board Game Rank",
    type: "number",
    min: 1,
    className: "tr",
    cellFunction: (row) => CU.formatNumber(row.boardGameRank),
  },
  {
    key: "imageUrl",
    label: "Image",
    type: "string",
    valueFunction: (row) => row.title,
    cellFunction: (row) =>
      row.imageUrl ? CU.createIcon(row.imageUrl, row.title) : " ",
  },
  {
    key: "title",
    label: "Title",
    className: "tl",
    valueFunction: (row) => {
      const editTitle = (article) => (title) =>
        title.startsWith(article) ? title.substring(article.length) : title;
      return R.pipe(
        editTitle("A "),
        editTitle("An "),
        editTitle("The ")
      )(row.title);
    },
    cellFunction: (row) => {
      const href = `https://www.boardgamegeek.com/boardgame/${row.id}`;
      return CU.createLink(href, row.title);
    },
  },
  {
    key: "designers",
    label: "Designer",
    valueFunction: (row) => Formatter.formatEntities(row.designers),
    cellFunction: (row) => createEntitiesTable(row.designers, DESIGNER_URL),
  },
  {
    key: "yearPublished",
    label: "Year Published",
    type: "number",
    className: "tr",
  },
  {
    key: "geekRating",
    label: "Geek Rating",
    type: "number",
    min: 0,
    max: 10,
    step: 0.1,
    className: "tr",
    cellFunction: (row) => CU.formatNumber(row.geekRating, CU.US_FORMATTER2),
  },
  {
    key: "minPlayers",
    label: "Min. Players",
    type: "number",
    min: 1,
    className: "tr",
  },
  {
    key: "maxPlayers",
    label: "Max. Players",
    type: "number",
    min: 1,
    className: "tr",
  },
  {
    key: "bestWithPlayers",
    label: "Best with Players",
    type: "number",
    min: 1,
    className: "tr",
  },
  {
    key: "minPlayTime",
    label: "Min. Play Time",
    type: "number",
    className: "tr",
  },
  {
    key: "maxPlayTime",
    label: "Max. Play Time",
    type: "number",
    className: "tr",
  },
  {
    key: "averageWeight",
    label: "Weight",
    type: "number",
    min: 1,
    max: 5,
    step: 0.1,
    className: "tr",
    cellFunction: (row) => CU.formatNumber(row.averageWeight, CU.US_FORMATTER2),
  },
  {
    key: "categories",
    label: "Category",
    valueFunction: (row) => Formatter.formatEntities(row.categories),
    cellFunction: (row) => createEntitiesTable(row.categories, CATEGORY_URL),
  },
  {
    key: "mechanics",
    label: "Mechanic",
    valueFunction: (row) => Formatter.formatEntities(row.mechanics),
    cellFunction: (row) => createEntitiesTable(row.mechanics, MECHANIC_URL),
  },
];

export default TableColumns;
