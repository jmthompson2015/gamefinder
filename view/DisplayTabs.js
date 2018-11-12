import ReactUtils from "./ReactUtilities.js";

class DisplayTabs extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChangeFunction.bind(this);
  }

  handleChangeFunction(event) {
    const source = event.target;
    const { onChange } = this.props;
    onChange(source.value);
  }

  render() {
    const { selected } = this.props;

    const radio1 = ReactDOMFactories.input({
      type: "radio",
      name: "displayTabs",
      defaultChecked: selected === "Game Table",
      onChange: this.handleChange,
      value: "Game Table"
    });
    const radio2 = ReactDOMFactories.input({
      type: "radio",
      name: "displayTabs",
      defaultChecked: selected === "Categories",
      onChange: this.handleChange,
      value: "Categories"
    });
    const radio3 = ReactDOMFactories.input({
      type: "radio",
      name: "displayTabs",
      defaultChecked: selected === "Mechanics",
      onChange: this.handleChange,
      value: "Mechanics"
    });
    const label1 = ReactDOMFactories.label({}, radio1, " ", "Game Table");
    const label2 = ReactDOMFactories.label({}, radio2, " ", "Categories");
    const label3 = ReactDOMFactories.label({}, radio3, " ", "Mechanics");
    const cells = [
      ReactUtils.createCell(label1, "radio1", "pa1"),
      ReactUtils.createCell(label2, "radio2", "pa1"),
      ReactUtils.createCell(label3, "radio3", "pa1")
    ];
    const row = ReactUtils.createRow(cells, "displayTabsRow");

    return ReactUtils.createTable(row, "displayTabsTable", "f6 gf-bg-dark1 gf-light2 pa1");
  }
}

DisplayTabs.propTypes = {
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.string
};

DisplayTabs.defaultProps = {
  selected: "Game Table"
};

export default DisplayTabs;
