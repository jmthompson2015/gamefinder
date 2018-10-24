import ProgressUI from "./ProgressUI.js";

const element = React.createElement(ProgressUI, {
  collectionCount: 1,
  collectionTotal: 2,
  collectionTime: 3,
  summaryCount: 4,
  summaryTotal: 5,
  summaryTime: 6,
  detailCount: 7,
  detailTotal: 8,
  detailTime: 9
});
ReactDOM.render(element, document.getElementById("panel"));
