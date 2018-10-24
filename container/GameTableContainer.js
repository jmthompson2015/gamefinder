import GameTable from "../view/GameTable.js";

const mapStateToProps = state => ({ rowData: state.filteredGameData });

export default ReactRedux.connect(mapStateToProps)(GameTable);
