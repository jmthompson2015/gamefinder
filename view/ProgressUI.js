import TimePrinter from "./TimePrinter.js";

const formatTime = time => (time !== undefined ? TimePrinter.formatElapsedTime("", 0, time) : "");

class ProgressUI extends React.Component {
  render() {
    const { collectionTime, detailTime, summaryTime } = this.props;
    const collectionTimeString = formatTime(collectionTime);
    const summaryTimeString = formatTime(summaryTime);
    const detailTimeString = formatTime(detailTime);
    const statusUI = ReactDOMFactories.img({
      src: "../resource/Waiting.gif",
      width: 24
    });

    const rows = [];
    const {
      collectionCount,
      collectionTotal,
      detailCount,
      detailTotal,
      summaryCount,
      summaryTotal
    } = this.props;

    let cells = [];
    cells.push(
      ReactDOMFactories.td(
        { key: "progress00", className: "progressTextCell" },
        "Collections loaded:"
      )
    );
    cells.push(
      ReactDOMFactories.td(
        { key: "progress01", className: "progressNumberCell" },
        `${collectionCount} / ${collectionTotal}`
      )
    );
    cells.push(
      ReactDOMFactories.td(
        { key: "progress02", className: "progressNumberCell" },
        collectionTimeString
      )
    );
    cells.push(ReactDOMFactories.td({ key: "progress03", rowSpan: 3 }, statusUI));
    rows.push(ReactDOMFactories.tr({ key: rows.length }, cells));

    cells = [];
    cells.push(
      ReactDOMFactories.td(
        { key: "progress10", className: "progressTextCell" },
        "Summaries loaded:"
      )
    );
    cells.push(
      ReactDOMFactories.td(
        { key: "progress11", className: "progressNumberCell" },
        `${summaryCount} / ${summaryTotal}`
      )
    );
    cells.push(
      ReactDOMFactories.td(
        { key: "progress12", className: "progressNumberCell" },
        summaryTimeString
      )
    );
    rows.push(ReactDOMFactories.tr({ key: rows.length }, cells));

    cells = [];
    cells.push(
      ReactDOMFactories.td({ key: "progress20", className: "progressTextCell" }, "Details loaded:")
    );
    cells.push(
      ReactDOMFactories.td(
        { key: "progress21", className: "progressNumberCell" },
        `${detailCount} / ${detailTotal}`
      )
    );
    cells.push(
      ReactDOMFactories.td({ key: "progress22", className: "progressNumberCell" }, detailTimeString)
    );
    rows.push(ReactDOMFactories.tr({ key: rows.length }, cells));

    return ReactDOMFactories.table({ className: "progressUI" }, ReactDOMFactories.tbody({}, rows));
  }
}

ProgressUI.propTypes = {
  collectionCount: PropTypes.number.isRequired,
  collectionTotal: PropTypes.number.isRequired,
  collectionTime: PropTypes.number.isRequired,
  summaryCount: PropTypes.number.isRequired,
  summaryTotal: PropTypes.number.isRequired,
  summaryTime: PropTypes.number.isRequired,
  detailCount: PropTypes.number.isRequired,
  detailTotal: PropTypes.number.isRequired,
  detailTime: PropTypes.number.isRequired
};

export default ProgressUI;
