import ASelector from "../artifact/Selector.js";

const TableRow = {};

TableRow.create = ({ gameSummary, gameDetail, users, wishers }) => {
  // gameSummary optional.
  // users optional.
  // wishers optional.
  if (gameSummary && gameSummary.id !== gameDetail.id) {
    throw new Error(
      `ID mismatch: gameSummary.id = ${gameSummary.id} gameDetail.id = ${gameDetail.id}`
    );
  }

  const {
    boardGameRank: boardGameRank1,
    geekRating: geekRating1,
    id: id1,
    imageUrl,
  } = gameSummary || {};
  const {
    averageRating,
    averageWeight,
    bestWithPlayers,
    boardGameRank: boardGameRank2,
    geekRating: geekRating2,
    id: id2,
    maxPlayers,
    maxPlayTime,
    minPlayers,
    minPlayTime,
    title,
    yearPublished,
    categoryIds,
    designerIds,
    mechanicIds,
  } = gameDetail;

  const id = id1 || id2;
  const boardGameRank = boardGameRank1 || boardGameRank2;
  const geekRating = geekRating1 || geekRating2;

  return Immutable({
    averageRating,
    averageWeight,
    bestWithPlayers,
    boardGameRank,
    geekRating,
    id,
    imageUrl,
    maxPlayers,
    maxPlayTime,
    minPlayers,
    minPlayTime,
    title,
    usernames: users,
    wishers,
    yearPublished,
    categories: ASelector.categoriesByIds(categoryIds),
    designers: ASelector.designersByIds(designerIds),
    mechanics: ASelector.mechanicsByIds(mechanicIds),
  });
};

export default TableRow;
