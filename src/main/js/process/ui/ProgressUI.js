define(function()
{
   var ProgressUI = React.createClass(
   {
      render: function()
      {
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
