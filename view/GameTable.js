import GameColumns from "../state/GameColumns.js";

import ReactUtils from "./ReactUtilities.js";

const entityReduceFunction = (accum, entity) => R.append(`${entity.name}, `, accum);

const valueFunctions = {
  usernames: data => R.reduce(entityReduceFunction, "", data.usernames),
  designers: data => R.reduce(entityReduceFunction, "", data.designers),
  categories: data => R.reduce(entityReduceFunction, "", data.categories),
  mechanics: data => R.reduce(entityReduceFunction, "", data.mechanics)
};

const determineValue = (column, data) => {
  let answer;

  if (valueFunctions && valueFunctions[column.key]) {
    answer = valueFunctions[column.key](data);
  } else {
    answer = data[column.key];
  }

  return answer;
};

// /////////////////////////////////////////////////////////////////////////////////////////////////
const createImageLink = (src, href, className = "imageBlock") => {
  const image = ReactDOMFactories.img({ className, src });

  return ReactDOMFactories.a({ key: src, href, target: "_blank" }, image);
};

const BGG_SRC = "../resource/BoardGameGeek16.png";

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

const DESIGNER_URL = "https://www.boardgamegeek.com/boardgamedesigner/";
const CATEGORY_URL = "https://www.boardgamegeek.com/boardgamecategory/";
const MECHANIC_URL = "https://www.boardgamegeek.com/boardgamemechanic/";

const cellFunctions = {
  usernames: data => (data.usernames !== undefined ? mapUsers(data.usernames) : undefined),
  title: data => {
    const href = `https://www.boardgamegeek.com/boardgame/${data.id}`;
    const link = createImageLink(BGG_SRC, href);
    return ReactDOMFactories.span({ className: "textImageLink" }, data.title, link);
  },
  designers: data => createEntitiesTable(data.designers, DESIGNER_URL),
  geekRating: data => (data.geekRating !== undefined ? round2(data.geekRating) : undefined),
  averageWeight: data => round2(data.averageWeight),
  categories: data => createEntitiesTable(data.categories, CATEGORY_URL),
  mechanics: data => createEntitiesTable(data.mechanics, MECHANIC_URL)
};

const determineCell = (column, data, value) => {
  let answer;

  if (cellFunctions && cellFunctions[column.key]) {
    answer = cellFunctions[column.key](data);
  } else {
    answer = value;
  }

  return answer;
};

// /////////////////////////////////////////////////////////////////////////////////////////////////
class GameTable extends React.Component {
  constructor(props) {
    super(props);

    // Factories.
    this.Table = React.createFactory(Reactable.Table);
    this.Tr = React.createFactory(Reactable.Tr);
    this.Td = React.createFactory(Reactable.Td);
  }

  createRow(data, key) {
    const mapFunction = column => {
      const value = determineValue(column, data);
      const cell = determineCell(column, data, value);
      return this.Td(
        { key: column.key + data.id, className: column.className, column: column.key, value },
        cell === undefined ? "" : cell
      );
    };
    const cells = R.map(mapFunction, GameColumns);

    return this.Tr({ key }, cells);
  }

  createTable(rowData) {
    const mapFunction = data => this.createRow(data, data.id);
    const rows = R.map(mapFunction, rowData);

    return this.Table({ className: "dataTable", columns: GameColumns, sortable: true }, rows);
  }

  render() {
    const { rowData } = this.props;
    const table = this.createTable(rowData);

    const rows = [];

    const rowCount = `Row Count: ${rowData.length}`;
    rows.push(
      ReactDOMFactories.tr(
        { key: rows.length },
        ReactDOMFactories.td({ className: "rowCount" }, rowCount)
      )
    );
    rows.push(ReactDOMFactories.tr({ key: rows.length }, ReactDOMFactories.td({}, table)));
    rows.push(
      ReactDOMFactories.tr(
        { key: rows.length },
        ReactDOMFactories.td({ className: "rowCount" }, rowCount)
      )
    );

    return ReactDOMFactories.table({}, ReactDOMFactories.tbody({}, rows));
  }
}

GameTable.propTypes = {
  rowData: PropTypes.arrayOf(PropTypes.shape()).isRequired
};

export default GameTable;
