import EntitiesTable from "../view/EntitiesTable.js";

import Formatter from "./Formatter.js";

const DESIGNER_URL = "https://www.boardgamegeek.com/boardgamedesigner/";
const CATEGORY_URL = "https://www.boardgamegeek.com/boardgamecategory/";
const MECHANIC_URL = "https://www.boardgamegeek.com/boardgamemechanic/";

const createImageLink = (src, href, title) => {
  const image = ReactDOMFactories.img({ src });

  return ReactDOMFactories.a(
    { key: src, href, title, target: "_blank" },
    image
  );
};

const createLink = (href, name) =>
  ReactDOMFactories.a({ key: name, href, target: "_blank" }, name);

const createEntitiesTable = (entities, url) =>
  React.createElement(EntitiesTable, { entities, url });

const mapUsers = (users) => {
  const mapFunction = (user) => {
    const src = `../resource/${user.name}.png`;
    const href = `https://www.boardgamegeek.com/collection/user/${user.name}`;

    return createImageLink(src, href, user.name);
  };
  const cells = R.map(mapFunction, R.sortBy(R.prop("name"), users));

  return ReactDOMFactories.span({ className: "widthFull" }, cells);
};

const round2 = (value) =>
  ![undefined, null].includes(value) ? value.toFixed(2) : undefined;

const TableColumns = [
  {
    key: "usernames",
    label: "Owner",
    type: "string",
    className: "displayInlineBlock",
    cellFunction: (row) =>
      row.usernames !== undefined ? mapUsers(row.usernames) : undefined,
    valueFunction: (row) => Formatter.formatEntities(row.usernames),
  },
  {
    key: "boardGameRank",
    label: "Board Game Rank",
    type: "number",
    min: 1,
    className: "tr",
  },
  {
    key: "title",
    label: "Title",
    className: "tl",
    cellFunction: (row) => {
      const href = `https://www.boardgamegeek.com/boardgame/${row.id}`;
      return createLink(href, row.title);
    },
    valueFunction: (row) => {
      const editTitle = (article) => (title) =>
        title.startsWith(article) ? title.substring(article.length) : title;
      return R.pipe(
        editTitle("A "),
        editTitle("An "),
        editTitle("The ")
      )(row.title);
    },
  },
  {
    key: "designers",
    label: "Designer",
    cellFunction: (row) => createEntitiesTable(row.designers, DESIGNER_URL),
    valueFunction: (row) => Formatter.formatEntities(row.designers),
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
    convertFunction: (data) => round2(data.geekRating),
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
    convertFunction: (data) => round2(data.averageWeight),
  },
  {
    key: "categories",
    label: "Category",
    cellFunction: (row) => createEntitiesTable(row.categories, CATEGORY_URL),
    valueFunction: (row) => Formatter.formatEntities(row.categories),
  },
  {
    key: "mechanics",
    label: "Mechanic",
    cellFunction: (row) => createEntitiesTable(row.mechanics, MECHANIC_URL),
    valueFunction: (row) => Formatter.formatEntities(row.mechanics),
  },
];

export default TableColumns;
