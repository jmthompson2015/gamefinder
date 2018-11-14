import GameDetail from "../artifact/GameDetail.js";
import User from "../artifact/User.js";

import GameSummaryState from "../state/GameSummaryState.js";
import TableRow from "../state/TableRow.js";

import GameTable from "./GameTable.js";

const gameSummary1 = GameSummaryState.create({ id: 169786, boardGameRank: 7 });
const gameDetail1 = GameDetail[169786]; // Scythe
const users1 = [User[1], User[2]];

const gameSummary2 = GameSummaryState.create({ id: 162886, boardGameRank: 29 }); // Spirit Island
const gameDetail2 = GameDetail[162886]; // Spirit Island
const users2 = [User[2], User[3]];

const rowData = [
  TableRow.create({
    gameSummary: gameSummary1,
    gameDetail: gameDetail1,
    users: users1
  }),
  TableRow.create({
    gameSummary: gameSummary2,
    gameDetail: gameDetail2,
    users: users2
  })
];

const element = React.createElement(GameTable, {
  isDisplayed: true,
  rowData
});
ReactDOM.render(element, document.getElementById("panel"));
