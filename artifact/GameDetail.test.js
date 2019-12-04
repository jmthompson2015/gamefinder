import GameDetail from "./GameDetail.js";

QUnit.module("GameDetail");

const round2 = value => Math.round(value * 100.0) / 100.0;

QUnit.test("GameDetail properties Scythe", assert => {
  // Setup.
  const id = 169786;

  // Run.
  const detail = GameDetail[id];

  // Verify.
  assert.equal(detail.id, id);
  assert.equal(detail.boardGameRank, 10);
  assert.equal(detail.title, "Scythe");
  assert.equal(round2(detail.geekRating), 8.1);
});

QUnit.test("GameDetail properties Spirit Island", assert => {
  // Setup.
  const id = 162886;

  // Run.
  const detail = GameDetail[id];

  // Verify.
  assert.equal(detail.id, id);
  assert.equal(detail.boardGameRank, 14);
  assert.equal(detail.title, "Spirit Island");
  assert.equal(round2(detail.geekRating), 8.03);
});

QUnit.test("GameDetail keys", assert => {
  // Setup.
  const length = 1223;

  // Run.
  const keys = Object.keys(GameDetail);

  // Verify.
  assert.equal(keys.length, length);

  const detail0 = GameDetail[keys[0]];
  assert.equal(detail0.id, 1);
  assert.equal(detail0.title, "Die Macher");

  const detailLast = GameDetail[keys[length - 1]];
  assert.equal(detailLast.id, 286096);
  assert.equal(detailLast.title, "Tapestry");
});

const GameDetailTest = {};
export default GameDetailTest;
