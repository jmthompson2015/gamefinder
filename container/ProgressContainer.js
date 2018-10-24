import User from "../artifact/User.js";

import Selector from "../state/Selector.js";

import ProgressUI from "../view/ProgressUI.js";

const mapStateToProps = state => {
  const gameTotal = Selector.gameTotal(state);

  return {
    collectionCount: Object.keys(state.userToReceivedMap).length,
    collectionTotal: Object.keys(User).length,
    collectionTime: state.collectionTime,
    summaryCount: Object.keys(state.gameSummaryMap).length,
    summaryTotal: gameTotal,
    summaryTime: state.summaryTime,
    detailCount: Object.keys(state.gameToDetail).length,
    detailTotal: gameTotal,
    detailTime: state.detailTime
  };
};

export default ReactRedux.connect(mapStateToProps)(ProgressUI);
