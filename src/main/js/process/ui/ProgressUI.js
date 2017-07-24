define(function()
{
   var ProgressUI = React.createClass(
   {
      propTypes:
      {
         collectionCount: React.PropTypes.number.isRequired,
         collectionTotal: React.PropTypes.number.isRequired,
         collectionTime: React.PropTypes.number.isRequired,
         summaryCount: React.PropTypes.number.isRequired,
         summaryTotal: React.PropTypes.number.isRequired,
         summaryTime: React.PropTypes.number.isRequired,
         detailCount: React.PropTypes.number.isRequired,
         detailTotal: React.PropTypes.number.isRequired,
         detailTime: React.PropTypes.number.isRequired,
      },

      render: function()
      {
         var collectionTime = this.props.collectionTime;
         collectionTime = (collectionTime !== undefined ? TimePrinter.formatElapsedTime("", 0, collectionTime) : "");
         var summaryTime = this.props.summaryTime;
         summaryTime = (summaryTime !== undefined ? TimePrinter.formatElapsedTime("", 0, summaryTime) : "");
         var detailTime = this.props.detailTime;
         detailTime = (detailTime !== undefined ? TimePrinter.formatElapsedTime("", 0, detailTime) : "");
         var statusUI = React.DOM.img(
         {
            src: "../resources/Waiting.gif",
            width: 24,
         });

         var rows = [];

         var cells = [];
         cells.push(React.DOM.td(
         {
            key: "progress00",
            className: "progressTextCell",
         }, "Collections loaded:"));
         cells.push(React.DOM.td(
         {
            key: "progress01",
            className: "progressNumberCell",
         }, this.props.collectionCount + " / " + this.props.collectionTotal));
         cells.push(React.DOM.td(
         {
            key: "progress02",
            className: "progressNumberCell",
         }, collectionTime));
         cells.push(React.DOM.td(
         {
            key: "progress03",
            rowSpan: 3,
         }, statusUI));
         rows.push(React.DOM.tr(
         {
            key: rows.length,
         }, cells));

         cells = [];
         cells.push(React.DOM.td(
         {
            key: "progress10",
            className: "progressTextCell",
         }, "Summaries loaded:"));
         cells.push(React.DOM.td(
         {
            key: "progress11",
            className: "progressNumberCell",
         }, this.props.summaryCount + " / " + this.props.summaryTotal));
         cells.push(React.DOM.td(
         {
            key: "progress12",
            className: "progressNumberCell",
         }, summaryTime));
         rows.push(React.DOM.tr(
         {
            key: rows.length,
         }, cells));

         cells = [];
         cells.push(React.DOM.td(
         {
            key: "progress20",
            className: "progressTextCell",
         }, "Details loaded:"));
         cells.push(React.DOM.td(
         {
            key: "progress21",
            className: "progressNumberCell",
         }, this.props.detailCount + " / " + this.props.detailTotal));
         cells.push(React.DOM.td(
         {
            key: "progress22",
            className: "progressNumberCell",
         }, detailTime));
         rows.push(React.DOM.tr(
         {
            key: rows.length,
         }, cells));

         return React.DOM.table(
         {
            className: "progressUI",
         }, React.DOM.tbody(
         {}, rows));
      }
   });

   return ProgressUI;
});
