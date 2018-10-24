import GameTable from "../view/GameTable.js";

const mapStateToProps = state => ({ rowData: state.filteredTableRows });

export default ReactRedux.connect(mapStateToProps)(GameTable);
