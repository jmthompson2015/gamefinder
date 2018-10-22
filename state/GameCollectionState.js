const GameCollectionState = {};

GameCollectionState.create = ({ username, collectionIds = [] }) =>
  Immutable({ username, collectionIds });

Object.freeze(GameCollectionState);

export default GameCollectionState;
