import ReactUtils from "./ReactUtilities.js";

const TABS = ["Game Table", "Categories", "Mechanics"];
const CLASS_SELECTED = "gf-bg-dark1 gf-light2 pa1";
const CLASS_NON_SELECTED = "gf-bg-light1 pa1";

class DisplayTabs extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChangeFunction.bind(this);
  }

  handleChangeFunction(event) {
    const { onChange } = this.props;
    onChange(event.target.innerHTML);
  }

  render() {
    const { selected } = this.props;

    const cellClass1 = selected === TABS[0] ? CLASS_SELECTED : CLASS_NON_SELECTED;
    const cellClass2 = selected === TABS[1] ? CLASS_SELECTED : CLASS_NON_SELECTED;
    const cellClass3 = selected === TABS[2] ? CLASS_SELECTED : CLASS_NON_SELECTED;
    const cellProps = { onClick: this.handleChange };

    const cells = [
      ReactUtils.createCell(TABS[0], "tab1", cellClass1, cellProps),
      ReactUtils.createCell("\xA0", "space1"),
      ReactUtils.createCell(TABS[1], "tab2", cellClass2, cellProps),
      ReactUtils.createCell("\xA0", "space2"),
      ReactUtils.createCell(TABS[2], "tab3", cellClass3, cellProps)
    ];
    const row = ReactUtils.createRow(cells, "displayTabsRow", "mh3");

    return ReactUtils.createTable(row, "displayTabsTable", "f6 pa1");
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
