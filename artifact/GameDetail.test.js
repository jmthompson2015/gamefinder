import GameDetail from "./GameDetail.js";

QUnit.module("GameDetail");

const round2 = (value) => Math.round(value * 100.0) / 100.0;

QUnit.test("GameDetail properties Scythe", (assert) => {
  // Setup.
  const id = 169786;

  // Run.
  const detail = GameDetail[id];

  // Verify.
  assert.equal(detail.id, id);
  assert.equal(detail.boardGameRank, 12);
  assert.equal(detail.title, "Scythe");
  assert.equal(round2(detail.geekRating), 8.09);
});

QUnit.test("GameDetail properties Spirit Island", (assert) => {
  // Setup.
  const id = 162886;

  // Run.
  const detail = GameDetail[id];

  // Verify.
  assert.equal(detail.id, id);
  assert.equal(detail.boardGameRank, 13);
  assert.equal(detail.title, "Spirit Island");
  assert.equal(round2(detail.geekRating), 8.07);
});

QUnit.test("GameDetail keys", (assert) => {
  // Setup.

  // Run.
  const keys = Object.keys(GameDetail);

  // Verify.
  assert.equal(keys.length, 1404);

  const detail0 = GameDetail[R.head(keys)];
  assert.equal(detail0.id, 1);
  assert.equal(detail0.title, "Die Macher");

  const detailLast = GameDetail[R.last(keys)];
  assert.equal(detailLast.id, 312667);
  assert.equal(detailLast.title, "Exploding Kittens: Barking Kittens");
});

const GameDetailTest = {};
export default GameDetailTest;
