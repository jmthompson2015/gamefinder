import DefaultFilters from "../state/DefaultFilters.js";
import EntityFilterUtils from "../state/EntityFilterUtilities.js";
import RangeFilterUtils from "../state/RangeFilterUtilities.js";

import EntityFilterUI from "./EntityFilterUI.js";
import RangeFilterRow from "./RangeFilterRow.js";
import ReactUtils from "./ReactUtilities.js";

class FilterUI extends React.Component {
  constructor(props) {
    super(props);

    this.handleEntityChange = this.handleEntityChangeFunction.bind(this);
    this.handleRangeChange = this.handleRangeChangeFunction.bind(this);
  }

  createButtonTable() {
    const { applyOnClick, clearCacheOnClick, removeOnClick, restoreDefaultsOnClick } = this.props;

    const filterCacheButton = ReactDOMFactories.button(
      { onClick: clearCacheOnClick },
      "Clear Cache"
    );
    const restoreButton = ReactDOMFactories.button(
      { onClick: restoreDefaultsOnClick },
      "Restore Defaults"
    );
    const unfilterButton = ReactDOMFactories.button({ onClick: removeOnClick }, "Remove");
    const filterButton = ReactDOMFactories.button({ onClick: applyOnClick }, "Apply");

    const cells = [
      ReactUtils.createCell(filterCacheButton, "filterCacheButton", "pa1"),
      ReactUtils.createCell(restoreButton, "restoreButton", "pa1"),
      ReactUtils.createCell(unfilterButton, "unfilterButton", "pa1"),
      ReactUtils.createCell(filterButton, "filterButton", "pa1")
    ];
    const row = ReactUtils.createRow(cells);

    return ReactUtils.createTable(row, "buttonTable", "f6 fr");
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
        ReactUtils.createCell(entitiesContainer, EntityFilterUtils.toString(filter), "pl2 v-top")
      );
    }, DefaultFilters.entityColumns);

    const row = ReactUtils.createRow(cells);

    return ReactUtils.createTable(row, "filtersUI", "f6");
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

    return ReactUtils.createTable(rows, "rangeTable", "gf-bg-light2 f6 mh1");
  }

  handleEntityChangeFunction(filter) {
    // console.log(`handleEntityChange() filter = ${JSON.stringify(filter)}`);
    const { onChange } = this.props;
    onChange(filter);
  }

  handleRangeChangeFunction(filter) {
    // console.log(`handleRangeChange() filter = ${JSON.stringify(filter)}`);
    const { onChange } = this.props;
    onChange(filter);
  }

  render() {
    const cells = [
      ReactUtils.createCell(this.createRangeTable(), "rangeTable", "v-top"),
      ReactUtils.createCell(this.createEntityTable(), "entityTable", "f6 mh1")
    ];
    const rows0 = ReactUtils.createRow(cells, "filterTableCells");
    const table0 = ReactUtils.createTable(rows0, "filterTableRow");
    const cell0 = ReactUtils.createCell("Filter", "filterTitle", "b f4 gf-light2 pa1 tl");
    const cell1 = ReactUtils.createCell(table0, "filterTable");
    const cell2 = ReactUtils.createCell(this.createButtonTable(), "buttonTable", "center pa2");

    const rows = [
      ReactUtils.createRow(cell0, "filterTitleRow"),
      ReactUtils.createRow(cell1, "filterTablesRow"),
      ReactUtils.createRow(cell2, "buttonRow")
    ];

    return ReactUtils.createTable(rows, "filterTable", "gf-bg-dark1 gf-f-entity pa1");
  }
}

FilterUI.propTypes = {
  filters: PropTypes.shape().isRequired,
  applyOnClick: PropTypes.func.isRequired,
  clearCacheOnClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
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
