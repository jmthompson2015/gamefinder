import User from "../artifact/User.js";

import Selector from "../state/Selector.js";

import ProgressUI from "../view/ProgressUI.js";

const mapStateToProps = state => ({
  collectionCount: Object.keys(state.userToReceivedMap).length,
  collectionTotal: Object.keys(User).length,
  collectionTime: state.collectionTime,
  summaryCount: Selector.actualSummaryCount(state),
  summaryTotal: Selector.expectedSummaryCount(state),
  summaryTime: state.summaryTime,
  detailCount: Selector.actualDetailCount(state),
  detailTotal: Selector.expectedDetailCount(state),
  detailTime: state.detailTime
});

export default ReactRedux.connect(mapStateToProps)(ProgressUI);
