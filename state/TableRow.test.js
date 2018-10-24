import GameDetail from "../artifact/GameDetail.js";
import User from "../artifact/User.js";

import TableRow from "./TableRow.js";
import GameDetailState from "./GameDetailState.js";
import GameSummaryState from "./GameSummaryState.js";

QUnit.module("TableRow");

const PROPS = ["id", "title"];

const createTestState = () => {
  const gameSummary = GameSummaryState.create({ id: 1 });
  const gameDetail = GameDetailState.create({ id: 1, title: 2 });
  const users = [User[1]];
  return TableRow.create({ gameSummary, gameDetail, users });
};

QUnit.test("create()", assert => {
  // Run.
  const data = createTestState();

  // Verify.
  PROPS.forEach((prop, i) => {
    assert.equal(data[prop], i + 1);
  });
});

QUnit.test("create() Scythe", assert => {
  // Setup.
  const gameSummary = GameSummaryState.create({ id: 169786 });
  const gameDetail = GameDetail[169786];
  const users = [User[1]];

  // Run.
  const data = TableRow.create({ gameSummary, gameDetail, users });

  // Verify.
  assert.ok(data);
  assert.equal(data.id, 169786);
  assert.equal(data.title, "Scythe");
  assert.equal(data.categories.length, 4, "categories length");
  assert.equal(data.categories[0].name, "Economic", "categories[0] name");
  assert.equal(data.designers.length, 1, "designers length");
  assert.equal(data.designers[0].name, "Jamey Stegmaier", "designers[0] name");
  assert.equal(data.mechanics.length, 3, "mechanics length");
  assert.equal(data.mechanics[0].name, "Area Control / Area Influence", "mechanics[0] name");
});

QUnit.test("create() immutable", assert => {
  // Setup.
  const data = createTestState();

  // Run / Verify.
  try {
    data.id = 12;
    assert.ok(false, "Should have thrown an exception");
  } catch (e) {
    assert.ok(true);
  }
});

const TableRowTest = {};
export default TableRowTest;
