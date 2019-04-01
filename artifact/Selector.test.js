import Selector from "./Selector.js";

QUnit.module("Selector");

QUnit.test("category()", assert => {
  // Setup.
  const id = 1001;

  // Run.
  const result = Selector.category(id);

  // Verify.
  assert.ok(result);
  assert.equal(result.id, id);
  assert.equal(result.name, "Political");
});

QUnit.test("categoriesByIds()", assert => {
  // Setup.
  const ids = [1001, 1002, 1003]; // there is no 1003

  // Run.
  const result = Selector.categoriesByIds(ids);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 2);
  assert.equal(result[0].id, ids[0]);
  assert.equal(result[0].name, "Political");
  assert.equal(result[1].id, ids[1]);
  assert.equal(result[1].name, "Card Game");
});

QUnit.test("designer()", assert => {
  // Setup.
  const id = 1;

  // Run.
  const result = Selector.designer(id);

  // Verify.
  assert.ok(result);
  assert.equal(result.id, id);
  assert.equal(result.name, "Karl-Heinz Schmiel");
});

QUnit.test("designersByIds()", assert => {
  // Setup.
  const ids = [14, 15, 19]; // there is no 15

  // Run.
  const result = Selector.designersByIds(ids);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 2);
  assert.equal(result[0].id, ids[0]);
  assert.equal(result[0].name, "Richard Garfield");
  assert.equal(result[1].id, ids[2]);
  assert.equal(result[1].name, "Richard Hamblen");
});

QUnit.test("mechanic()", assert => {
  // Setup.
  const id = 2001;

  // Run.
  const result = Selector.mechanic(id);

  // Verify.
  assert.ok(result);
  assert.equal(result.id, id);
  assert.equal(result.name, "Action Point Allowance System");
});

QUnit.test("mechanicsByIds()", assert => {
  // Setup.
  const ids = [2005, 2006, 2007]; // there is no 2006

  // Run.
  const result = Selector.mechanicsByIds(ids);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 2);
  assert.equal(result[0].id, ids[0]);
  assert.equal(result[0].name, "Stock Holding");
  assert.equal(result[1].id, ids[2]);
  assert.equal(result[1].name, "Pick-up and Deliver");
});

QUnit.test("userByName()", assert => {
  // Setup.
  const name = "ghightshoe";

  // Run.
  const result = Selector.userByName(name);

  // Verify.
  assert.ok(result);
  assert.equal(result.id, 1);
  assert.equal(result.name, name);
});

QUnit.test("usernames()", assert => {
  // Setup.

  // Run.
  const result = Selector.usernames();

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 4);
  assert.equal(result[0], "ghightshoe");
  assert.equal(result[1], "jmthompson");
  assert.equal(result[2], "kmistr");
  assert.equal(result[3], "nic");
});

QUnit.test("usersByIds()", assert => {
  // Setup.
  const ids = [1, 55, 3]; // there is no 55

  // Run.
  const result = Selector.usersByIds(ids);

  // Verify.
  assert.ok(result);
  assert.equal(result.length, 2);
  assert.equal(result[0].id, 1);
  assert.equal(result[0].name, "ghightshoe");
  assert.equal(result[1].id, 3);
  assert.equal(result[1].name, "kmistr");
});

const SelectorTest = {};
export default SelectorTest;
