import ReactUtils from "../view/ReactUtilities.js";

import Formatter from "./Formatter.js";

const BGG_SRC = "../resource/BoardGameGeek16.png";

const DESIGNER_URL = "https://www.boardgamegeek.com/boardgamedesigner/";
const CATEGORY_URL = "https://www.boardgamegeek.com/boardgamecategory/";
const MECHANIC_URL = "https://www.boardgamegeek.com/boardgamemechanic/";

const createImageLink = (src, href, className = "imageBlock") => {
  const image = ReactDOMFactories.img({ className, src });

  return ReactDOMFactories.a({ key: src, href, target: "_blank" }, image);
};

const createEntitiesTable = (entities, url) => {
  const mapFunction = entity => {
    const href = url + entity.id;
    const link = createImageLink(BGG_SRC, href);
    const cell = ReactUtils.createCell([entity.name, link]);

    return ReactUtils.createRow(cell, entity.name);
  };
  const rows = R.map(mapFunction, entities);

  return ReactUtils.createTable(rows, url, "bn gf-f-entity tl");
};

const mapUsers = users => {
  const mapFunction = user => {
    const src = `../resource/${user.name}.png`;
    const href = `https://www.boardgamegeek.com/collection/user/${user.name}`;

    return createImageLink(src, href, "");
  };
  const cells = R.map(mapFunction, users);

  return ReactDOMFactories.span({ className: "widthFull" }, cells);
};

const round2 = value => Math.round(value * 100.0) / 100.0;

const TableColumns = [
  {
    key: "usernames",
    label: "Owner",
    type: "string",
    className: "displayInlineBlock",
    cellFunction: row => (row.usernames !== undefined ? mapUsers(row.usernames) : undefined),
    valueFunction: row => Formatter.formatEntities(row.usernames)
  },
  {
    key: "boardGameRank",
    label: "Board Game Rank",
    type: "number",
    className: "tr"
  },
  {
    key: "title",
    label: "Title",
    className: "tl",
    cellFunction: row => {
      const href = `https://www.boardgamegeek.com/boardgame/${row.id}`;
      const link = createImageLink(BGG_SRC, href);
      return ReactDOMFactories.span({ className: "textImageLink" }, row.title, link);
    },
    valueFunction: row => {
      const editTitle = article => title =>
        title.startsWith(article) ? title.substring(article.length) : title;
      return R.pipe(
        editTitle("A "),
        editTitle("An "),
        editTitle("The ")
      )(row.title);
    }
  },
  {
    key: "id",
    label: "ID",
    className: "tr",
    isHidden: true
  },
  {
    key: "designers",
    label: "Designer",
    cellFunction: row => createEntitiesTable(row.designers, DESIGNER_URL),
    valueFunction: row => Formatter.formatEntities(row.designers)
  },
  {
    key: "yearPublished",
    label: "Year Published",
    type: "number",
    className: "tr"
  },
  {
    key: "geekRating",
    label: "Geek Rating",
    type: "number",
    className: "tr",
    convertFunction: data => (data.geekRating !== undefined ? round2(data.geekRating) : undefined)
  },
  {
    key: "minPlayers",
    label: "Min. Players",
    type: "number",
    className: "tr"
  },
  {
    key: "maxPlayers",
    label: "Max. Players",
    type: "number",
    className: "tr"
  },
  {
    key: "bestWithPlayers",
    label: "Best with Players",
    type: "number",
    className: "tr"
  },
  {
    key: "minPlayTime",
    label: "Min. Play Time",
    type: "number",
    className: "tr"
  },
  {
    key: "maxPlayTime",
    label: "Max. Play Time",
    type: "number",
    className: "tr"
  },
  {
    key: "averageWeight",
    label: "Weight",
    type: "number",
    className: "tr",
    convertFunction: data =>
      data.averageWeight !== undefined ? round2(data.averageWeight) : undefined
  },
  {
    key: "categories",
    label: "Category",
    cellFunction: row => createEntitiesTable(row.categories, CATEGORY_URL),
    valueFunction: row => Formatter.formatEntities(row.categories)
  },
  {
    key: "mechanics",
    label: "Mechanic",
    cellFunction: row => createEntitiesTable(row.mechanics, MECHANIC_URL),
    valueFunction: row => Formatter.formatEntities(row.mechanics)
  }
];

export default TableColumns;
