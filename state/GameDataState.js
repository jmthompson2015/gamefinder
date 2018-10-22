const GameDataState = {};

GameDataState.create = ({ gameSummary, gameDetail, usernames }) => {
  // usernames optional.
  if (gameSummary.id !== gameDetail.id) {
    throw new Error(
      `ID mismatch: gameSummary.id = ${gameSummary.id} gameDetail.id = ${gameDetail.id}`
    );
  }

  const { boardGameRank, geekRating, id } = gameSummary;
  const {
    averageWeight,
    bestWithPlayers,
    categories,
    designers,
    mechanics,
    maxPlayers,
    maxPlayTime,
    minPlayers,
    minPlayTime,
    title,
    yearPublished
  } = gameDetail;

  return Immutable({
    averageWeight,
    bestWithPlayers,
    boardGameRank,
    categories,
    designers,
    geekRating,
    id,
    maxPlayers,
    maxPlayTime,
    mechanics,
    minPlayers,
    minPlayTime,
    title,
    usernames,
    yearPublished
  });
};

export default GameDataState;
