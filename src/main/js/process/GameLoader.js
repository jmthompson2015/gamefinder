define(["process/Action", "process/GameCollectionFetcher", "process/GameDetailFetcher", "process/GameSummaryFetcher", "process/Selector"],
   function(Action, GameCollectionFetcher, GameDetailFetcher, GameSummaryFetcher, Selector)
   {
      "use strict";

      function GameLoader(store, callback)
      {
         InputValidator.validateNotNull("store", store);
         // callback optional.

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
      }

      GameLoader.prototype.load = function()
      {
         // Load from the internet.
         var store = this.store();
         var start0 = Date.now();

         var collectionCallback = function(gameCollectionMap)
         {
            var end0 = Date.now();
            store.dispatch(Action.setCollectionTime(end0 - start0));
            var start1 = Date.now();

            var summaryCallback = function(gameSummaryMap)
            {
               var end1 = Date.now();
               store.dispatch(Action.setSummaryTime(end1 - start1));
               var start2 = Date.now();

               var detailCallback = function(gameDetailMap)
               {
                  var end2 = Date.now();
                  store.dispatch(Action.setDetailTime(end2 - start2));
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
            fetcher.fetchData();
         }, this);
      };

      GameLoader.prototype.loadGameDetails = function(newGameSummaryMap, callback)
      {
         InputValidator.validateNotNull("newGameSummaryMap", newGameSummaryMap);
         InputValidator.validateNotNull("callback", callback);

         // Fetch a game detail for each game summary.
         this.detailCallback = callback;
         var keys = newGameSummaryMap.keySeq().toArray();

         var needGameDetailIds = keys.filter(function(key)
         {
            return Selector.findGameDetailById(this.store().getState(), key) === undefined;
         }, this);

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

      GameLoader.prototype.receiveCollection = function(username, collectionIds)
      {
         InputValidator.validateNotNull("username", username);
         InputValidator.validateNotNull("collectionIds", collectionIds);

         var store = this.store();

         if (collectionIds.length > 0)
         {
            store.dispatch(Action.addUserCollection(username, collectionIds));
         }

         if (Selector.isCollectionsLoaded(store.getState()))
         {
            var gameCollectionMap = Selector.gameCollectionMap(store.getState());
            this.collectionCallback(gameCollectionMap);
         }
      };

      GameLoader.prototype.receiveDetailData = function(newGameDetailMap)
      {
         InputValidator.validateNotNull("newGameDetailMap", newGameDetailMap);

         var store = this.store();
         store.dispatch(Action.addGameDetails(newGameDetailMap));

         if (this.detailCallback)
         {
            var gameDetailMap = Selector.gameDetailMap(store.getState());
            this.detailCallback(gameDetailMap);
         }
      };

      GameLoader.prototype.receiveSummaryData = function(newGameSummaryMap)
      {
         InputValidator.validateNotNull("newGameSummaryMap", newGameSummaryMap);

         var store = this.store();
         store.dispatch(Action.addGameSummaries(newGameSummaryMap));

         if (Selector.isSummariesLoaded(store.getState()) && this.summaryCallback)
         {
            var gameSummaryMap = Selector.gameSummaryMap(store.getState());
            this.summaryCallback(gameSummaryMap);
         }
      };

      return GameLoader;
   });
