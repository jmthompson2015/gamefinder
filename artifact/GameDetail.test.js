import GameDetail from "./GameDetail.js";

QUnit.module("GameDetail");

QUnit.test("GameDetail properties Scythe", assert => {
  // Setup.
  const id = 169786;

  // Run.
  const detail = GameDetail[id];

  // Verify.
  assert.equal(detail.id, id);
  assert.equal(detail.boardGameRank, 7);
  assert.equal(detail.title, "Scythe");
  assert.equal(detail.geekRating, 8.10941);
});

QUnit.test("GameDetail properties Spirit Island", assert => {
  // Setup.
  const id = 162886;

  // Run.
  const detail = GameDetail[id];

  // Verify.
  assert.equal(detail.id, id);
  assert.equal(detail.boardGameRank, 29);
  assert.equal(detail.title, "Spirit Island");
  assert.equal(detail.geekRating, 7.84984);
});

QUnit.test("GameDetail keys", assert => {
  // Setup.
  const length = 999;

  // Run.
  const keys = Object.keys(GameDetail);

  // Verify.
  assert.equal(keys.length, length);

  const detail0 = GameDetail[keys[0]];
  assert.equal(detail0.id, 1);
  assert.equal(detail0.title, "Die Macher");

  const detailLast = GameDetail[keys[length - 1]];
  assert.equal(detailLast.id, 245638);
  assert.equal(detailLast.title, "Coimbra");
});

const GameDetailTest = {};
export default GameDetailTest;
