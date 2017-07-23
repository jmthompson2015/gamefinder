define(["process/Action", "process/GameCollectionFetcher", "process/GameDetailFetcher", "process/GameSummaryFetcher", "process/Selector"],
   function(Action, GameCollectionFetcher, GameDetailFetcher, GameSummaryFetcher, Selector)
   {
      "use strict";

      function GameLoader(store, callback)
      {
         InputValidator.validateNotNull("store", store);
         // callback optional.

         var that = this;

         var collectionCallback;
         var summaryCallback;
         var detailCallback;

         this.store = function()
         {
            return store;
         };

         this.callback = function()
         {
            return callback;
         };

         this.receiveCollection = function(username, collectionIds)
         {
            InputValidator.validateNotNull("username", username);
            InputValidator.validateNotNull("collectionIds", collectionIds);
            // LOGGER.info("GameLoader.receiveCollection(" + username + ") collectionIds.length = " + collectionIds.length);

            if (collectionIds.length > 0)
            {
               store.dispatch(Action.addUserCollection(username, collectionIds));
            }

            if (this.isCollectionsLoaded())
            {
               var gameCollectionMap = Selector.gameCollectionMap(store.getState());
               this.collectionCallback(gameCollectionMap);
            }
         };

         this.receiveDetailData = function(newGameDetailMap)
         {
            InputValidator.validateNotNull("newGameDetailMap", newGameDetailMap);
            // LOGGER.info("GameLoader.receiveDetailData() newGameDetailMap length = " + Object.keys(newGameDetailMap).length);

            store.dispatch(Action.addGameDetails(newGameDetailMap));

            if (this.detailCallback)
            {
               var gameDetailMap = Selector.gameDetailMap(store.getState());
               this.detailCallback(gameDetailMap);
            }
         };

         this.receiveSummaryData = function(newGameSummaryMap)
         {
            InputValidator.validateNotNull("newGameSummaryMap", newGameSummaryMap);
            // LOGGER.info("GameLoader.receiveSummaryData() newGameSummaryMap length = " + Object.keys(newGameSummaryMap).length);

            store.dispatch(Action.addGameSummaries(newGameSummaryMap));

            if (this.isSummariesLoaded() && this.summaryCallback)
            {
               var gameSummaryMap = Selector.gameSummaryMap(store.getState());
               this.summaryCallback(gameSummaryMap);
            }
         };
      }

      GameLoader.prototype.isCollectionsLoaded = function()
      {
         var usernames = Selector.usernames(this.store().getState());
         var usernameToReceivedMap = Selector.usernameToReceivedMap(this.store().getState());

         return usernames.reduce(function(accumulator, username)
         {
            return accumulator && (usernameToReceivedMap[username] === true);
         }, true);
      };

      GameLoader.prototype.isDetailsLoaded = function()
      {
         var length = Object.keys(this.gameDetailMap()).length;
         var gameTotal = Selector.gameTotal(this.store().getState());

         return (length === gameTotal);
      };

      GameLoader.prototype.isSummariesLoaded = function()
      {
         var gameSummaryMap = Selector.gameSummaryMap(this.store().getState());
         var length = Object.keys(gameSummaryMap).length;
         var gameTotal = Selector.gameTotal(this.store().getState());

         return (length === gameTotal);
      };

      GameLoader.prototype.load = function()
      {
         // Load from the internet.
         var collectionCallback = function(gameCollectionMap)
         {
            var summaryCallback = function(gameSummaryMap)
            {
               var detailCallback = function(gameDetailMap)
               {
                  var callback = this.callback();
                  callback(gameDetailMap);
               };

               this.loadGameDetails(gameSummaryMap, detailCallback);
            };

            this.loadGameSummaries(summaryCallback);
         };

         this.loadCollections(collectionCallback);
      };

      GameLoader.prototype.loadCollections = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         this.collectionCallback = callback;
         var usernames = Selector.usernames(this.store().getState());

         usernames.forEach(function(username)
         {
            var fetcher = new GameCollectionFetcher(username, this.receiveCollection.bind(this));

            setTimeout(function()
            {
               fetcher.fetchData();
            }, 50);
         }, this);
      };

      GameLoader.prototype.loadGameDetails = function(newGameSummaryMap, callback)
      {
         InputValidator.validateNotNull("newGameSummaryMap", newGameSummaryMap);
         InputValidator.validateNotNull("callback", callback);

         // Fetch a game detail for each game summary.
         this.detailCallback = callback;
         var keys = Object.keys(newGameSummaryMap);
         // LOGGER.info("GameLoader.loadGameDetails() keys.length = " + keys.length);

         var needGameDetailIds = keys.filter(function(key)
         {
            return Selector.findGameDetailById(this.store().getState(), key) === undefined;
         }, this);
         // LOGGER.info("GameLoader.loadGameDetails() needGameDetailIds.length = " + needGameDetailIds.length);

         if (needGameDetailIds.length > 0)
         {
            var numPerCall = 50;
            var count = Math.ceil(needGameDetailIds.length / numPerCall);

            for (var i = 0; i < count; i++)
            {
               var start = numPerCall * i;
               var max = Math.min(numPerCall, needGameDetailIds.length);
               var end = start + max;
               var fetcher = new GameDetailFetcher(needGameDetailIds.slice(start, end), this.receiveDetailData.bind(this));
               fetcher.fetchData();
            }
         }
      };

      GameLoader.prototype.loadGameSummaries = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         this.summaryCallback = callback;
         var pageCount = Selector.pageCount(this.store().getState());

         for (var i = 1; i <= pageCount; i++)
         {
            var fetcher = new GameSummaryFetcher(i, this.receiveSummaryData.bind(this));
            fetcher.fetchData();
         }
      };

      return GameLoader;
   });
