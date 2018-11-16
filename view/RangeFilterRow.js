import GameColumns from "../state/GameColumns.js";
import RangeFilter from "../state/RangeFilter.js";

import NumberInput from "./NumberInput.js";
import ReactUtils from "./ReactUtilities.js";

const createCheckbox = (column, filter, handleChange) => property =>
  ReactDOMFactories.input({
    id: `${column.key}${property}`,
    type: "checkbox",
    defaultChecked: filter[property],
    onChange: handleChange
  });

const createTextField = (column, filter, handleChange) => property =>
  React.createElement(NumberInput, {
    id: `${column.key}${property}`,
    type: "number",
    className: "filterField",
    initialValue: Number(filter[property]),
    onBlur: handleChange
  });

class RangeFilterRow extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChangeFunction.bind(this);
  }

  handleChangeFunction() {
    const { filter, onChange } = this.props;
    const { columnKey } = filter;

    const isMinEnabled = document.getElementById(`${columnKey}isMinEnabled`).checked;
    const minValue = document.getElementById(`${columnKey}minValue`).value;
    const isMaxEnabled = document.getElementById(`${columnKey}isMaxEnabled`).checked;
    const maxValue = document.getElementById(`${columnKey}maxValue`).value;

    const newFilter = RangeFilter.create({
      columnKey,
      isMinEnabled,
      minValue,
      isMaxEnabled,
      maxValue
    });

    onChange(newFilter);
  }

  render() {
    const { filter } = this.props;
    const column = GameColumns.findByKey(filter.columnKey);
    const createCheckbox2 = createCheckbox(column, filter, this.handleChange);
    const createTextField2 = createTextField(column, filter, this.handleChange);

    const cells = [
      ReactUtils.createCell(createCheckbox2("isMinEnabled"), `${column.key}MinCheckCell`, "ph1"),
      ReactUtils.createCell(createTextField2("minValue"), `${column.key}MinCell`, "ph1"),
      ReactUtils.createCell(`\u2264 ${column.label} \u2264`, `${column.key}LabelCell`, "ph1 tc"),
      ReactUtils.createCell(createCheckbox2("isMaxEnabled"), `${column.key}MaxCheckCell`, "ph1"),
      ReactUtils.createCell(createTextField2("maxValue"), `${column.key}MaxCell`, "ph1")
    ];

    return ReactUtils.createRow(cells, `${column.key}Row`);
  }
}

RangeFilterRow.propTypes = {
  filter: PropTypes.shape().isRequired,
  onChange: PropTypes.func.isRequired
};

export default RangeFilterRow;
