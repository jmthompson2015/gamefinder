import GameColumns from "../state/GameColumns.js";

import DataTable from "./DataTable.js";

const valueFunctions = {
  usernames: data => data.users,
  designers: data => data.designers,
  categories: data => data.categories,
  mechanics: data => data.mechanics
};

// /////////////////////////////////////////////////////////////////////////////////////////////////
const createImageLink = (src, href, className) => {
  const myClassName = className !== undefined ? className : "imageBlock";
  const image = ReactDOMFactories.img({ className: myClassName, src });

  return ReactDOMFactories.a({ key: src, href, target: "_blank" }, image);
};

const createEntitiesTable = (entities, url) => {
  const src = "../resource/BoardGameGeek16.png";
  const mapFunction = entity => {
    const href = url + entity.id;
    const link = createImageLink(src, href);
    const cell = ReactDOMFactories.td({}, entity.name, link);

    return ReactDOMFactories.tr({ key: entity.name }, cell);
  };
  const rows = R.map(mapFunction, entities);
  const tbody = ReactDOMFactories.tbody({}, rows);

  return ReactDOMFactories.table({ className: "entitiesTable" }, tbody);
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

const cellFunctions = {
  usernames: data => (data.users !== undefined ? mapUsers(data.users) : undefined),
  title: data => {
    const src = "../resource/BoardGameGeek16.png";
    const href = `https://www.boardgamegeek.com/boardgame/${data.id}`;
    const link = createImageLink(src, href);
    return ReactDOMFactories.span({ className: "textImageLink" }, data.title, link);
  },
  designers: data => {
    const url = "https://www.boardgamegeek.com/boardgamedesigner/";
    return createEntitiesTable(data.designers, url);
  },
  geekRating: data => (data.geekRating !== undefined ? round2(data.geekRating) : undefined),
  averageWeight: data => round2(data.averageWeight),
  categories: data => {
    const url = "https://www.boardgamegeek.com/boardgamecategory/";
    return createEntitiesTable(data.categories, url);
  },
  mechanics: data => {
    const url = "https://www.boardgamegeek.com/boardgamemechanic/";
    return createEntitiesTable(data.mechanics, url);
  }
};

// /////////////////////////////////////////////////////////////////////////////////////////////////
class GameTable extends React.Component {
  render() {
    const { rowData } = this.props;

    const table = React.createElement(DataTable, {
      columns: GameColumns,
      rowData,
      cellFunctions,
      valueFunctions
    });

    return table;
  }
}

GameTable.propTypes = {
  rowData: PropTypes.arrayOf().isRequired
};

export default GameTable;
