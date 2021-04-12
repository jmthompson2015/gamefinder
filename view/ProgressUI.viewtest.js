import ProgressUI from "./ProgressUI.js";

const element = React.createElement(ProgressUI, {
  collectionCount: 1,
  collectionTotal: 2,
  collectionTime: 3,
  wishlistCount: 4,
  wishlistTotal: 5,
  wishlistTime: 6,
  summaryCount: 7,
  summaryTotal: 8,
  summaryTime: 9,
  detailCount: 10,
  detailTotal: 11,
  detailTime: 12,
});
ReactDOM.render(element, document.getElementById("panel"));
