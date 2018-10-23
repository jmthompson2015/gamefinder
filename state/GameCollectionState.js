const GameCollectionState = {};

GameCollectionState.create = ({ userId, collectionIds = [] }) =>
  Immutable({ userId, collectionIds });

Object.freeze(GameCollectionState);

export default GameCollectionState;
