import User from "../artifact/User.js";

import Selector from "../state/Selector.js";

import ProgressUI from "../view/ProgressUI.js";

const mapStateToProps = (state) => ({
  collectionCount: Object.keys(state.userToReceivedMap).length,
  collectionTotal: Object.keys(User).length,
  collectionTime: state.collectionTime,
  collectionBusy: state.collectionBusy,
  collectionError: state.collectionError,
  wishlistCount: Object.keys(state.userToReceivedMap2).length,
  wishlistTotal: Object.keys(User).length,
  wishlistTime: state.wishlistTime,
  wishlistBusy: state.wishlistBusy,
  wishlistError: state.wishlistError,
  summaryCount: Selector.actualSummaryCount(state),
  summaryTotal: Selector.expectedSummaryCount(state),
  summaryTime: state.summaryTime,
  summaryBush: state.summaryBusy,
  summaryError: state.summaryError,
  detailCount: Selector.actualDetailCount(state),
  detailTotal: Selector.expectedDetailCount(state),
  detailTime: state.detailTime,
  detailBusy: state.detailBusy,
  detailError: state.detailError,
});

export default ReactRedux.connect(mapStateToProps)(ProgressUI);
