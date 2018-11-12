import GameTable from "../view/GameTable.js";

const mapStateToProps = state => {
  const { displayTab } = state;

  const isDisplayed = displayTab === "Game Table";

  return { isDisplayed, rowData: state.filteredTableRows };
};

export default ReactRedux.connect(mapStateToProps)(GameTable);
