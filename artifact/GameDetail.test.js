import GameDetail from "./GameDetail.js";

QUnit.module("GameDetail");

QUnit.test("GameDetail properties Scythe", assert => {
  // Setup.
  const id = 169786;

  // Run.
  const detail = GameDetail[id];

  // Verify.
  assert.equal(detail.id, id);
  assert.equal(detail.title, "Scythe");
});

QUnit.test("GameDetail keys", assert => {
  // Setup.
  const length = 1000;

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
