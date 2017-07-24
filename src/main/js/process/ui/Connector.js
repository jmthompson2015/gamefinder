define(["process/Selector"], function(Selector)
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
         var gameTotal = Selector.gameTotal(state);

         return (
         {
            collectionCount: state.usernameToReceivedMap.size,
            collectionTotal: state.usernames.size,
            collectionTime: state.collectionTime,
            summaryCount: state.gameSummaryMap.size,
            summaryTotal: gameTotal,
            summaryTime: state.summaryTime,
            detailCount: Object.keys(state.gameDetailMap).length,
            detailTotal: gameTotal,
            detailTime: state.detailTime,
         });
      }
   };

   if (Object.freeze)
   {
      Object.freeze(Connector);
   }

   return Connector;
});
