define(function()
{
   "use strict";

   function GameDetailFetcher(gameIds, callback)
   {
      InputValidator.validateNotEmpty("gameIds", gameIds);
      InputValidator.validateNotNull("callback", callback);

      var that = this;

      this.fetchData = function()
      {
         LOGGER.trace("GameDetailFetcher.fetchData() start");

         var url = createUrl();
         $.ajax(url).done(this.receiveData).fail(function(jqXHR, textStatus, errorThrown)
         {
            LOGGER.error(errorThrown);
         });

         LOGGER.trace("GameDetailFetcher.fetchData() end");
      };

      this.receiveData = function(xmlDocument)
      {
         LOGGER.trace("GameDetailFetcher.receiveData() start");

         // LOGGER.info("xmlDocument = " + (new XMLSerializer()).serializeToString(xmlDocument));
         var gameDetails = parseGameDetails(xmlDocument);
         callback(gameDetails);

         LOGGER.trace("GameDetailFetcher.receiveData() end");
      };

      function createUrl()
      {
         var baseUrl = "https://query.yahooapis.com/v1/public/yql?q=";

         // https://www.boardgamegeek.com/xmlapi2/thing?stats=1&id=12333,120677
         var idsString = gameIds.reduce(function(previousValue, id, i)
         {
            var answer = previousValue + id;

            if (i < gameIds.length - 1)
            {
               answer += ",";
            }

            return answer;
         }, "");

         var sourceUrl = "https://www.boardgamegeek.com/xmlapi2/thing?stats=1&id=" + idsString;
         var query = "select * from xml where url='" + sourceUrl + "'";
         var answer = baseUrl + encodeURIComponent(query);
         LOGGER.debug("url = " + answer);

         return answer;
      }

      function parseBestWithPlayers(xmlDocument, xmlFragment)
      {
         var answer;

         var xpath = "poll[@name='suggested_numplayers']/results";
         var resultType = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
         var rows = xmlDocument.evaluate(xpath, xmlFragment, null, resultType, null);
         var thisRow = rows.iterateNext();
         var maxNumVotes;

         while (thisRow)
         {
            var numPlayersCell = xmlDocument.evaluate("@numplayers", thisRow, null, XPathResult.STRING_TYPE, null);
            var numPlayers = numPlayersCell.stringValue.trim();
            var numVotesCell = xmlDocument.evaluate("result[@value='Best']/@numvotes", thisRow, null, XPathResult.STRING_TYPE, null);
            var numVotes = parseInt(numVotesCell.stringValue.trim());
            LOGGER.debug("numPlayers = " + numPlayers + " numVotes = " + numVotes);

            if (!maxNumVotes || numVotes > maxNumVotes)
            {
               answer = numPlayers;
               maxNumVotes = numVotes;
            }

            thisRow = rows.iterateNext();
         }

         LOGGER.debug("answer = " + answer + " maxNumVotes = " + maxNumVotes);

         return answer;
      }

      function parseEntities(xmlDocument, xmlFragment, type)
      {
         var answer = [];

         var xpath = "link[@type='" + type + "']";
         var resultType = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
         var rows = xmlDocument.evaluate(xpath, xmlFragment, null, resultType, null);
         var thisRow = rows.iterateNext();

         while (thisRow)
         {
            var idCell = xmlDocument.evaluate("@id", thisRow, null, XPathResult.STRING_TYPE, null);
            var id = idCell.stringValue.trim();
            var nameCell = xmlDocument.evaluate("@value", thisRow, null, XPathResult.STRING_TYPE, null);
            var name = nameCell.stringValue.trim();
            var entity = {
               type: type,
               id: parseInt(id),
               name: name,
               count: 1,
            };
            answer.push(entity);

            thisRow = rows.iterateNext();
         }

         return answer;
      }

      function parseGameDetails(xmlDocument)
      {
         LOGGER.trace("GameDetailFetcher.parseGameDetails() start");

         var answer = Immutable.Map();

         // This gives the data items.
         var xpath = "query/results/items/item";
         var resultType = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
         var rows = xmlDocument.evaluate(xpath, xmlDocument, null, resultType, null);
         var thisRow = rows.iterateNext();

         while (thisRow)
         {
            var gameDetail = parseGameDetail(xmlDocument, thisRow);
            answer = answer.set(gameDetail.get("id"), gameDetail);

            thisRow = rows.iterateNext();
         }

         LOGGER.trace("GameDetailFetcher.parseGameDetails() end");

         return answer;
      }

      function parseGameDetail(xmlDocument, xmlFragment)
      {
         var idCell = xmlDocument.evaluate("@id", xmlFragment, null, XPathResult.STRING_TYPE, null);
         var id = idCell.stringValue.trim();

         var titleCell = xmlDocument.evaluate("name[@type='primary']/@value", xmlFragment, null, XPathResult.STRING_TYPE, null);
         var title = titleCell.stringValue.trim();

         var yearPublishedCell = xmlDocument.evaluate("yearpublished/@value", xmlFragment, null, XPathResult.STRING_TYPE, null);
         var yearPublished = yearPublishedCell.stringValue.trim();

         var minPlayersCell = xmlDocument.evaluate("minplayers/@value", xmlFragment, null, XPathResult.STRING_TYPE, null);
         var minPlayers = minPlayersCell.stringValue.trim();

         var maxPlayersCell = xmlDocument.evaluate("maxplayers/@value", xmlFragment, null, XPathResult.STRING_TYPE, null);
         var maxPlayers = maxPlayersCell.stringValue.trim();

         var bestWithPlayers = parseBestWithPlayers(xmlDocument, xmlFragment);

         var minPlayTimeCell = xmlDocument.evaluate("minplaytime/@value", xmlFragment, null, XPathResult.STRING_TYPE, null);
         var minPlayTime = minPlayTimeCell.stringValue.trim();

         var maxPlayTimeCell = xmlDocument.evaluate("maxplaytime/@value", xmlFragment, null, XPathResult.STRING_TYPE, null);
         var maxPlayTime = maxPlayTimeCell.stringValue.trim();

         var averageWeightCell = xmlDocument.evaluate("statistics/ratings/averageweight/@value", xmlFragment, null, XPathResult.STRING_TYPE, null);
         var averageWeight = averageWeightCell.stringValue.trim();

         var categories = parseEntities(xmlDocument, xmlFragment, "boardgamecategory");
         var designers = parseEntities(xmlDocument, xmlFragment, "boardgamedesigner");
         var mechanics = parseEntities(xmlDocument, xmlFragment, "boardgamemechanic");

         return Immutable.Map(
         {
            id: parseInt(id),
            title: title,
            designers: designers,
            yearPublished: parseInt(yearPublished),
            minPlayers: parseInt(minPlayers),
            maxPlayers: parseInt(maxPlayers),
            bestWithPlayers: parseInt(bestWithPlayers),
            minPlayTime: parseInt(minPlayTime),
            maxPlayTime: parseInt(maxPlayTime),
            averageWeight: Number(averageWeight),
            categories: categories,
            mechanics: mechanics,
         });
      }
   }

   return GameDetailFetcher;
});
