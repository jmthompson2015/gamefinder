import GameDetail from "../artifact/GameDetail.js";

import ActionCreator from "../state/ActionCreator.js";
import GameSummaryState from "../state/GameSummaryState.js";
import Reducer from "../state/Reducer.js";

import GameTableContainer from "./GameTableContainer.js";

const gameSummary1 = GameSummaryState.create({ id: 169786, boardGameRank: 7 });
const gameDetail1 = GameDetail[169786]; // Scythe

const gameSummary2 = GameSummaryState.create({ id: 162886, boardGameRank: 29 }); // Spirit Island
const gameDetail2 = GameDetail[162886]; // Spirit Island

const gameSummaries = [gameSummary1, gameSummary2];
const gameDetails = [gameDetail1, gameDetail2];

const store = Redux.createStore(Reducer.root);
store.dispatch(ActionCreator.addUserCollection(1, [169786]));
store.dispatch(ActionCreator.addUserCollection(2, [169786, 162886]));
store.dispatch(ActionCreator.addUserCollection(3, [162886]));
store.dispatch(ActionCreator.addGameSummaries(gameSummaries));
store.dispatch(ActionCreator.addGameDetails(gameDetails));

const container = React.createElement(GameTableContainer);
const element = React.createElement(ReactRedux.Provider, { store }, container);

ReactDOM.render(element, document.getElementById("panel"));
