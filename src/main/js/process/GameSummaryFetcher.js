define(function()
{
   "use strict";

   function GameSummaryFetcher(page, callback)
   {
      InputValidator.validateInRange("page", page, 1, 10);
      InputValidator.validateNotNull("callback", callback);

      var that = this;

      this.fetchData = function()
      {
         LOGGER.trace("GameSummaryFetcher.fetchData() start");

         var url = createUrl();
         $.ajax(url).done(this.receiveData).fail(function(jqXHR, textStatus, errorThrown)
         {
            LOGGER.error(errorThrown);
         });

         LOGGER.trace("GameSummaryFetcher.fetchData() end");
      };

      this.receiveData = function(xmlDocument)
      {
         LOGGER.trace("GameSummaryFetcher.receiveData() start");

         // LOGGER.trace("xmlDocument = " + (new XMLSerializer()).serializeToString(xmlDocument));
         var content = xmlDocument.children[0].children[0].children[0];
         content = content.innerHTML;
         content = content.replace(/&lt;/g, "<");
         content = content.replace(/&gt;/g, ">");
         xmlDocument.children[0].children[0].children[0].innerHTML = content;
         var gameSummaries = parseGameSummaries(xmlDocument);
         callback(gameSummaries);

         LOGGER.trace("GameSummaryFetcher.receiveData() end");
      };

      function createUrl()
      {
         var baseUrl = "https://query.yahooapis.com/v1/public/yql?q=";

         // https://www.boardgamegeek.com/browse/boardgame
         // https://www.boardgamegeek.com/browse/boardgame/page/2
         var sourceUrl = "https://www.boardgamegeek.com/browse/boardgame" + "/page/" + page;

         var query = "select * from htmlstring where url=\"" + sourceUrl + "\"";
         var answer = baseUrl + encodeURIComponent(query) + "&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
         LOGGER.debug("url = " + answer);

         return answer;
      }

      function parseGameSummaries(xmlDocument)
      {
         LOGGER.trace("GameSummaryFetcher.parseGameSummaries() start");

         var answer = Immutable.Map();

         // This gives the data rows (tr).
         var xpath = "//tr[@id='row_']";
         var resultType = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
         var rows = xmlDocument.evaluate(xpath, xmlDocument, null, resultType, null);
         var thisRow = rows.iterateNext();

         while (thisRow)
         {
            var gameSummary = parseGameSummary(xmlDocument, thisRow);
            answer = answer.set(gameSummary.get("id"), gameSummary);

            thisRow = rows.iterateNext();
         }

         LOGGER.trace("GameSummaryFetcher.parseGameSummaries() end");

         return answer;
      }

      function parseGameSummary(xmlDocument, xmlFragment)
      {
         // This gives the data cells (td).
         var xpath = "td";
         var resultType = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
         var cells = xmlDocument.evaluate(xpath, xmlFragment, null, resultType, null);

         var boardGameRank = cells.snapshotItem(0).textContent.trim();
         var title = cells.snapshotItem(2).textContent.trim();
         title = title.replace(/\n/g, "");
         while (title.indexOf("  ") >= 0)
         {
            title = title.replace(/  /g, " ");
         }

         var idCell = xmlDocument.evaluate("a/@href", cells.snapshotItem(1), null, XPathResult.STRING_TYPE, null);
         var id = idCell.stringValue.trim();
         id = id.replace("/boardgame/", "");
         id = id.replace("/boardgameexpansion/", "");
         var index = id.indexOf("/");
         id = id.substring(0, index);

         var geekRatingDisplay = cells.snapshotItem(3).textContent.trim();
         var averageRatingDisplay = cells.snapshotItem(4).textContent.trim();
         var numVoters = cells.snapshotItem(5).textContent.trim();

         return Immutable.Map(
         {
            id: parseInt(id),
            title: title,
            boardGameRank: parseInt(boardGameRank),
            geekRating: parseFloat(geekRatingDisplay),
            geekRatingDisplay: geekRatingDisplay,
            averageRating: parseFloat(averageRatingDisplay),
            averageRatingDisplay: averageRatingDisplay,
            numVoters: parseInt(numVoters),
         });
      }
   }

   return GameSummaryFetcher;
});
