const GameSummaryState = {};

GameSummaryState.create = ({
  id,
  imageUrl,
  title,
  boardGameRank,
  geekRating,
  geekRatingDisplay,
  averageRating,
  averageRatingDisplay,
  numVoters,
}) =>
  Immutable({
    id,
    imageUrl,
    title,
    boardGameRank,
    geekRating,
    geekRatingDisplay,
    averageRating,
    averageRatingDisplay,
    numVoters,
  });

Object.freeze(GameSummaryState);

export default GameSummaryState;
