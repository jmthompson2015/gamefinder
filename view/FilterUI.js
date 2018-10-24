import DefaultFilters from "../state/DefaultFilters.js";

import InputPanel2 from "./InputPanel2.js";

const sortEntities = entities => {
  entities.sort((a, b) => {
    let answer = b.count - a.count;

    if (answer === 0) {
      if (a.name > b.name) {
        answer = 1;
      } else if (a.name < b.name) {
        answer = -1;
      }
    }

    return answer;
  });
};

class FilterUI extends React.Component {
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
    const filterButton = ReactDOMFactories.button({ onClick: applyOnClick }, "Apply Filter");

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

    DefaultFilters.entityColumns.forEach(column => {
      let valueMap;
      const clientProps = {};

      switch (column.key) {
        case "designers":
          valueMap = designerMap;
          clientProps["data-entitytype"] = "designers";
          break;
        case "categories":
          valueMap = categoryMap;
          clientProps["data-entitytype"] = "categories";
          break;
        case "mechanics":
          valueMap = mechanicMap;
          clientProps["data-entitytype"] = "mechanics";
          break;
        case "usernames":
          valueMap = userMap;
          clientProps["data-entitytype"] = "usernames";
          break;
        default:
          throw new Error(`Unknown entity column: ${column.key}`);
      }

      const values = Object.values(valueMap);
      sortEntities(values);

      const nbsp = "\u00A0";
      const labelFunction = value => `${value.name.replace(/ /g, nbsp) + nbsp}(${value.count})`;
      const oldFilter = filters[column.key];
      const initialValues = [];

      if (oldFilter && oldFilter.values.length > 0) {
        const entities = oldFilter.values.map(id => valueMap[id]);

        initialValues.vizziniAddAll(entities);
      }

      const label = ReactDOMFactories.span({ className: "entityLabel" }, column.label);
      const checkboxPanel = React.createElement(InputPanel2, {
        onChange: handleEntityChange,
        type: InputPanel2.Type.CHECKBOX,
        values,

        clientProps,
        initialValues,
        labelFunction,
        panelClass: "entitiesTable"
      });

      cells.push(
        ReactDOMFactories.td(
          { key: cells.length, className: "entityFilterContainer" },
          label,
          ReactDOMFactories.div({ className: "entitiesContainer" }, checkboxPanel)
        )
      );
    });

    const row = ReactDOMFactories.tr({}, cells);

    return ReactDOMFactories.table({ className: "filtersUI" }, ReactDOMFactories.tbody({}, row));
  }

  createRangeTable() {
    const rows = [];

    const { filters } = this.props;
    const { handleRangeChange } = this;

    DefaultFilters.rangeColumns.forEach(column => {
      const filter = filters[column.key];
      const cells = [];
      cells.push(
        ReactDOMFactories.td(
          { key: cells.length },
          ReactDOMFactories.input({
            id: `${column.key}MinChecked`,
            type: "checkbox",
            defaultChecked: filter ? filter.isMinEnabled : false,
            onChange: handleRangeChange
          })
        )
      );
      cells.push(
        ReactDOMFactories.td(
          { key: cells.length },
          ReactDOMFactories.input({
            id: `${column.key}Min`,
            type: "number",
            className: "filterField",
            defaultValue: filter ? filter.minValue : 0,
            onChange: handleRangeChange
          })
        )
      );
      cells.push(ReactDOMFactories.td({ key: cells.length }, `\u2264 ${column.label} \u2264`));
      cells.push(
        ReactDOMFactories.td(
          { key: cells.length },
          ReactDOMFactories.input({
            id: `${column.key}MaxChecked`,
            type: "checkbox",
            defaultChecked: filter ? filter.isMaxEnabled : false,
            onChange: handleRangeChange
          })
        )
      );
      cells.push(
        ReactDOMFactories.td(
          { key: cells.length },
          ReactDOMFactories.input({
            id: `${column.key}Max`,
            type: "number",
            className: "filterField",
            defaultValue: filter ? filter.maxValue : 10,
            onChange: handleRangeChange
          })
        )
      );

      rows.push(ReactDOMFactories.tr({ key: rows.length }, cells));
    });

    return ReactDOMFactories.table({ className: "filterTable" }, ReactDOMFactories.tbody({}, rows));
  }

  render() {
    const cells = [];
    cells.push(
      ReactDOMFactories.td({ key: cells.length, className: "filterTable" }, this.createRangeTable())
    );
    cells.push(
      ReactDOMFactories.td({ key: cells.length, className: "filtersUI" }, this.createEntityTable())
    );

    const rows = [];
    rows.push(ReactDOMFactories.tr({ key: rows.length }, cells));

    rows.push(
      ReactDOMFactories.tr(
        { key: rows.length },
        ReactDOMFactories.td({ colSpan: 5 }, this.createButtonTable())
      )
    );

    return ReactDOMFactories.table({ className: "filtersUI" }, ReactDOMFactories.tbody({}, rows));
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
