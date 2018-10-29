import ASelector from "../artifact/Selector.js";

import ActionCreator from "../state/ActionCreator.js";
import Selector from "../state/Selector.js";

import GameCollectionFetcher from "./GameCollectionFetcher.js";
import GameDetailFetcher from "./GameDetailFetcher.js";
import GameSummaryFetcher from "./GameSummaryFetcher.js";

const GameLoader = {};

GameLoader.load = store =>
  new Promise(resolve => {
    // Load from the internet.
    const start0 = Date.now();

    GameLoader.loadCollections(store).then(() => {
      const end0 = Date.now();
      store.dispatch(ActionCreator.setCollectionTime(end0 - start0));
      const start1 = Date.now();

      GameLoader.loadGameSummaries(store).then(() => {
        const end1 = Date.now();
        store.dispatch(ActionCreator.setSummaryTime(end1 - start1));
        const start2 = Date.now();

        GameLoader.loadGameDetails(store).then(() => {
          const end2 = Date.now();
          store.dispatch(ActionCreator.setDetailTime(end2 - start2));
          resolve();
        });
      });
    });
  });

GameLoader.loadCollections = store =>
  new Promise(resolve => {
    const receiveCollection = ({ userId, gameIds }) => {
      if (gameIds.length > 0) {
        store.dispatch(ActionCreator.addUserCollection(userId, gameIds));
      }

      if (Selector.isCollectionsLoaded(store.getState())) {
        const gameToUsers = Selector.gameToUsers(store.getState());
        resolve(gameToUsers);
      }
    };

    const usernames = ASelector.usernames();
    usernames.forEach(username => {
      GameCollectionFetcher.fetchData(username).then(receiveCollection);
    });
  });

GameLoader.loadGameDetails = store =>
  new Promise(resolve => {
    const receiveDetailData = gameDetails => {
      store.dispatch(ActionCreator.addGameDetails(gameDetails));

      if (Selector.isDetailsLoaded(store.getState())) {
        const gameToDetail = Selector.gameToDetail(store.getState());
        resolve(gameToDetail);
      }
    };

    // Fetch a game detail for each game summary.
    const gameIds = Selector.gameIdsFromCollectionsAndSummaries(store.getState());

    const needGameDetailIds = gameIds.filter(
      gameId => Selector.findGameDetailById(store.getState(), gameId) === undefined,
      this
    );

    if (needGameDetailIds.length > 0) {
      const numPerCall = 50;
      const count = Math.ceil(needGameDetailIds.length / numPerCall);

      for (let i = 0; i < count; i += 1) {
        const start = numPerCall * i;
        const max = Math.min(numPerCall, needGameDetailIds.length);
        const end = start + max;
        GameDetailFetcher.fetchData(needGameDetailIds.slice(start, end)).then(receiveDetailData);
      }
    }
  });

GameLoader.loadGameSummaries = store =>
  new Promise(resolve => {
    const receiveSummaryData = gameSummaries => {
      store.dispatch(ActionCreator.addGameSummaries(gameSummaries));

      if (Selector.isSummariesLoaded(store.getState())) {
        const myGameSummaries = Object.values(Selector.gameToSummary(store.getState()));
        resolve(myGameSummaries);
      }
    };

    const pageCount = Selector.pageCount(store.getState());

    for (let i = 1; i <= pageCount; i += 1) {
      GameSummaryFetcher.fetchData(i).then(receiveSummaryData);
    }
  });

export default GameLoader;
