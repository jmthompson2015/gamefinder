import EntityFilter from "../state/EntityFilter.js";
import GameColumns from "../state/GameColumns.js";

import InputPanel2 from "./InputPanel2.js";
import ReactUtils from "./ReactUtilities.js";

const NBSP = "\u00A0";

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

class EntityFilterUI extends React.Component {
  constructor(props) {
    super(props);

    this.handleEntityChange = this.handleEntityChangeFunction.bind(this);
  }

  handleEntityChangeFunction(event, selected) {
    const { filter, onChange } = this.props;
    const { columnKey } = filter;

    const values = R.map(sel => sel.id, selected);
    const newFilter = EntityFilter.create({
      columnKey,
      values
    });

    onChange(newFilter);
  }

  render() {
    const { filter, entityMap } = this.props;

    const column = GameColumns.findByKey(filter.columnKey);
    const clientProps = {};
    const values = Object.values(entityMap);
    sortEntities(values);

    const labelFunction = value => `${value.name.replace(/ /g, NBSP)}${NBSP}(${value.count})`;
    const initialValues =
      filter && filter.values.length > 0 ? R.map(id => entityMap[id], filter.values) : [];

    const label = ReactDOMFactories.span(
      { key: "entityLabel", className: "entityLabel" },
      column.label
    );
    const checkboxPanel = React.createElement(InputPanel2, {
      onChange: this.handleEntityChange,
      type: InputPanel2.Type.CHECKBOX,
      values,

      clientProps,
      initialValues,
      labelFunction,
      panelClass: "entitiesTable"
    });
    const entitiesContainer = ReactDOMFactories.div(
      { key: "entitiesContainer", className: "entitiesContainer" },
      checkboxPanel
    );

    const cell1 = ReactUtils.createCell(
      label,
      `${column.key}EntitiesLabel`,
      "entityFilterContainer"
    );
    const cell2 = ReactUtils.createCell(
      entitiesContainer,
      `${column.key}EntitiesContainer`,
      "entityFilterContainer"
    );

    const rows = [
      ReactUtils.createRow(cell1, "labelRow"),
      ReactUtils.createRow(cell2, "entitiesRow")
    ];

    return ReactUtils.createTable(rows, "filtersUI", "filtersUI");
  }
}

EntityFilterUI.propTypes = {
  entityMap: PropTypes.shape().isRequired,
  filter: PropTypes.shape().isRequired,
  onChange: PropTypes.func.isRequired
};

export default EntityFilterUI;