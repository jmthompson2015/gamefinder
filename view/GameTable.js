import GameColumns from "../state/GameColumns.js";

import DataTable from "./DataTable.js";
import ReactUtils from "./ReactUtilities.js";

const entityReduceFunction = (accum, entity) => R.append(`${entity.name}, `, accum);

const valueFunctions = {
  usernames: data => R.reduce(entityReduceFunction, "", data.usernames),
  designers: data => R.reduce(entityReduceFunction, "", data.designers),
  categories: data => R.reduce(entityReduceFunction, "", data.categories),
  mechanics: data => R.reduce(entityReduceFunction, "", data.mechanics)
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

const cellFunctions = {
  usernames: data => (data.usernames !== undefined ? mapUsers(data.usernames) : undefined),
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
    const { isDisplayed, rowData } = this.props;

    if (isDisplayed) {
      const table = React.createElement(DataTable, {
        columns: GameColumns,
        rowData,
        cellFunctions,
        valueFunctions
      });

      return table;
    }

    return ReactDOMFactories.span({}, " ");
  }
}

GameTable.propTypes = {
  isDisplayed: PropTypes.bool.isRequired,
  rowData: PropTypes.arrayOf().isRequired
};

export default GameTable;
