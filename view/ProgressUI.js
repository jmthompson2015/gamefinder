import TimePrinter from "./TimePrinter.js";

const formatTime = (time) =>
  time !== undefined ? TimePrinter.formatElapsedTime("", 0, time) : "";

const statusUI = ReactDOMFactories.img({
  src: "../resource/Waiting.gif",
  width: 24,
});

const createRow = (
  cellPrefix,
  rowKey,
  title,
  count,
  total,
  timeString,
  isBusy,
  errorProp,
) => {
  let cells = [];
  cells.push(
    ReactDOMFactories.td(
      { key: `${cellPrefix}0`, className: "progressTextCell" },
      title,
    ),
  );
  cells.push(
    ReactDOMFactories.td(
      { key: `${cellPrefix}1`, className: "progressNumberCell" },
      `${count} / ${total}`,
    ),
  );
  cells.push(
    ReactDOMFactories.td(
      { key: `${cellPrefix}2`, className: "progressNumberCell" },
      timeString,
    ),
  );

  let cell;
  if (errorProp) {
    cell = ReactDOMFactories.td(
      { key: `${cellPrefix}3`, className: "red" },
      errorProp.message,
    );
  } else if (isBusy) {
    cell = ReactDOMFactories.td({ key: `${cellPrefix}3` }, statusUI);
  } else {
    cell = ReactDOMFactories.td({ key: `${cellPrefix}3` });
  }
  cells.push(cell);

  return ReactDOMFactories.tr({ key: rowKey }, cells);
};

class ProgressUI extends React.PureComponent {
  render() {
    const { collectionTime, detailTime, summaryTime, wishlistTime } =
      this.props;
    const collectionTimeString = formatTime(collectionTime);
    const wishlistTimeString = formatTime(wishlistTime);
    const summaryTimeString = formatTime(summaryTime);
    const detailTimeString = formatTime(detailTime);

    const rows = [];
    const {
      collectionCount,
      collectionTotal,
      collectionBusy,
      collectionError,
      wishlistCount,
      wishlistTotal,
      wishlistBusy,
      wishlistError,
      detailCount,
      detailTotal,
      detailBusy,
      detailError,
      summaryCount,
      summaryTotal,
      summaryBusy,
      summaryError,
    } = this.props;

    rows.push(
      createRow(
        "progress0",
        rows.length,
        "Collections loaded:",
        collectionCount,
        collectionTotal,
        collectionTimeString,
        collectionBusy,
        collectionError,
      ),
    );

    rows.push(
      createRow(
        "progress1",
        rows.length,
        "Wishlists loaded:",
        wishlistCount,
        wishlistTotal,
        wishlistTimeString,
        wishlistBusy,
        wishlistError,
      ),
    );

    rows.push(
      createRow(
        "progress2",
        rows.length,
        "Summaries loaded:",
        summaryCount,
        summaryTotal,
        summaryTimeString,
        summaryBusy,
        summaryError,
      ),
    );

    rows.push(
      createRow(
        "progress3",
        rows.length,
        "Details loaded:",
        detailCount,
        detailTotal,
        detailTimeString,
        detailBusy,
        detailError,
      ),
    );

    const cells = [
      ReactDOMFactories.td(
        { key: "progress4", className: "i pv2", colSpan: "4" },
        "If data fails to load, you may need to Disable Cross-Origin Restrictions in your browser.",
      ),
    ];
    rows.push(ReactDOMFactories.tr({ key: rows.length }, cells));

    return ReactDOMFactories.table(
      { className: "progressUI" },
      ReactDOMFactories.tbody({}, rows),
    );
  }
}

ProgressUI.propTypes = {
  collectionCount: PropTypes.number.isRequired,
  collectionTotal: PropTypes.number.isRequired,
  wishlistCount: PropTypes.number.isRequired,
  wishlistTotal: PropTypes.number.isRequired,
  summaryCount: PropTypes.number.isRequired,
  summaryTotal: PropTypes.number.isRequired,
  detailCount: PropTypes.number.isRequired,
  detailTotal: PropTypes.number.isRequired,

  collectionTime: PropTypes.number,
  wishlistTime: PropTypes.number,
  summaryTime: PropTypes.number,
  detailTime: PropTypes.number,

  collectionBusy: PropTypes.bool,
  wishlistBusy: PropTypes.bool,
  summaryBusy: PropTypes.bool,
  detailBusy: PropTypes.bool,

  collectionError: PropTypes.object,
  wishlistError: PropTypes.object,
  summaryError: PropTypes.object,
  detailError: PropTypes.object,
};

ProgressUI.defaultProps = {
  collectionTime: undefined,
  wishlistTime: undefined,
  summaryTime: undefined,
  detailTime: undefined,

  collectionBusy: false,
  wishlistBusy: false,
  summaryBusy: false,
  detailBusy: false,

  collectionError: undefined,
  wishlistError: undefined,
  summaryError: undefined,
  detailError: undefined,
};

export default ProgressUI;
