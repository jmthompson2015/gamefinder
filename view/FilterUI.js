import DefaultFilters from "../state/DefaultFilters.js";
import EntityFilterUtils from "../state/EntityFilterUtilities.js";
import RangeFilterUtils from "../state/RangeFilterUtilities.js";

import EntityFilterUI from "./EntityFilterUI.js";
import RangeFilterRow from "./RangeFilterRow.js";
import ReactUtils from "./ReactUtilities.js";

class FilterUI extends React.Component {
  constructor(props) {
    super(props);

    const { filters } = this.props;
    this.state = { filters };

    this.handleEntityChange = this.handleEntityChangeFunction.bind(this);
    this.handleRangeChange = this.handleRangeChangeFunction.bind(this);
  }

  createButtonTable() {
    const { applyOnClick, clearCacheOnClick, removeOnClick, restoreDefaultsOnClick } = this.props;

    const filterCacheButton = ReactDOMFactories.button(
      { onClick: clearCacheOnClick },
      "Clear Filter Cache"
    );
    const restoreButton = ReactDOMFactories.button(
      { onClick: restoreDefaultsOnClick },
      "Restore Defaults"
    );
    const unfilterButton = ReactDOMFactories.button({ onClick: removeOnClick }, "Remove Filter");

    const { filters } = this.state;
    const filterButton = ReactDOMFactories.button(
      {
        "data-filters": JSON.stringify(filters),
        onClick: applyOnClick
      },
      "Apply Filter"
    );

    const cells = [];
    cells.push(ReactDOMFactories.td({ key: cells.length }, filterCacheButton));
    cells.push(ReactDOMFactories.td({ key: cells.length }, restoreButton));
    cells.push(ReactDOMFactories.td({ key: cells.length }, unfilterButton));
    cells.push(ReactDOMFactories.td({ key: cells.length }, filterButton));
    const row = ReactDOMFactories.tr({}, cells);

    return ReactDOMFactories.table({}, ReactDOMFactories.tbody({}, row));
  }

  createEntityTable() {
    const cells = [];
    const { designerMap, categoryMap, filters, mechanicMap, userMap } = this.props;
    const { handleEntityChange } = this;

    R.forEach(column => {
      let entityMap;

      switch (column.key) {
        case "designers":
          entityMap = designerMap;
          break;
        case "categories":
          entityMap = categoryMap;
          break;
        case "mechanics":
          entityMap = mechanicMap;
          break;
        case "usernames":
          entityMap = userMap;
          break;
        default:
          throw new Error(`Unknown entity column: ${column.key}`);
      }

      const filter = filters[column.key];
      const entitiesContainer = React.createElement(EntityFilterUI, {
        entityMap,
        filter,
        onChange: handleEntityChange
      });
      cells.push(
        ReactUtils.createCell(
          entitiesContainer,
          EntityFilterUtils.toString(filter),
          "entityFilterContainer"
        )
      );
    }, DefaultFilters.entityColumns);

    const row = ReactUtils.createRow(cells);

    return ReactUtils.createTable(row, "filtersUI", "filtersUI");
  }

  createRangeTable() {
    const rows = [];

    const { filters } = this.props;
    const { handleRangeChange } = this;

    R.forEach(column => {
      const filter = filters[column.key];
      const row = React.createElement(RangeFilterRow, {
        key: RangeFilterUtils.toString(filter),
        column,
        filter,
        onChange: handleRangeChange
      });
      rows.push(row);
    }, DefaultFilters.rangeColumns);

    return ReactUtils.createTable(rows, "rangeTable", "filterTable");
  }

  handleEntityChangeFunction(filter) {
    // console.log(`handleEntityChange() filter = ${JSON.stringify(filter)}`);
    const { filters } = this.state;
    this.setState({ filters: R.assoc(filter.columnKey, filter, filters) });
  }

  handleRangeChangeFunction(filter) {
    // console.log(`handleRangeChange() filter = ${JSON.stringify(filter)}`);
    const { filters } = this.state;
    this.setState({ filters: R.assoc(filter.columnKey, filter, filters) });
  }

  render() {
    const cells = [
      ReactUtils.createCell(this.createRangeTable(), "rangeTable", "v-top"),
      ReactUtils.createCell(this.createEntityTable(), "entityTable", "filtersUI")
    ];
    const rows0 = ReactUtils.createRow(cells, "filterTableCells");
    const table0 = ReactUtils.createTable(rows0, "filterTableRow");
    const cell1 = ReactUtils.createCell(table0, "filterTable");
    const cell2 = ReactUtils.createCell(this.createButtonTable(), "buttonTable");

    const rows = [
      ReactUtils.createRow(cell1, "filterTablesRow"),
      ReactUtils.createRow(cell2, "buttonRow")
    ];

    return ReactUtils.createTable(rows, "filterTable", "filtersUI f7");
  }
}

FilterUI.propTypes = {
  filters: PropTypes.shape().isRequired,
  applyOnClick: PropTypes.func.isRequired,
  clearCacheOnClick: PropTypes.func.isRequired,
  removeOnClick: PropTypes.func.isRequired,
  restoreDefaultsOnClick: PropTypes.func.isRequired,

  designerMap: PropTypes.shape(),
  categoryMap: PropTypes.shape(),
  mechanicMap: PropTypes.shape(),
  userMap: PropTypes.shape()
};

FilterUI.defaultProps = {
  designerMap: {},
  categoryMap: {},
  mechanicMap: {},
  userMap: {}
};

export default FilterUI;
