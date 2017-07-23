define(function()
{
   "use strict";
   var Connector = {};

   Connector.FilterUI = {
      mapStateToProps: function(state, ownProps)
      {
         return (
         {
            filters: state.filters,
         });
      }
   };

   Connector.GameTable = {
      mapStateToProps: function(state, ownProps)
      {
         return (
         {
            rowData: state.filteredGameData,
         });
      },
   };

   Connector.ProgressUI = {
      mapStateToProps: function(state, ownProps)
      {
         var gameTotal = state.pageCount * 100;

         return (
         {
            collectionCount: Object.keys(state.gameDatabase.usernameToReceivedMap()).length,
            collectionTotal: state.usernames.length,
            summaryCount: Object.keys(state.gameSummaryMap).length,
            summaryTotal: gameTotal,
            detailCount: Object.keys(state.gameDetailMap).length,
            detailTotal: gameTotal,
         });
      }
   };

   if (Object.freeze)
   {
      Object.freeze(Connector);
   }

   return Connector;
});
