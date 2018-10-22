const GameSummaryState = {};

GameSummaryState.create = ({
  id,
  title,
  boardGameRank,
  geekRating,
  geekRatingDisplay,
  averageRating,
  averageRatingDisplay,
  numVoters
}) =>
  Immutable({
    id,
    title,
    boardGameRank,
    geekRating,
    geekRatingDisplay,
    averageRating,
    averageRatingDisplay,
    numVoters
  });

Object.freeze(GameSummaryState);

export default GameSummaryState;
