import GameDetail from "../artifact/GameDetail.js";

import EntityUtils from "./EntityUtilities.js";

QUnit.module("EntityUtilities");

const createGameDetails = () => [
  GameDetail[169786], // Scythe
  GameDetail[162886] // Spirit Island
];

QUnit.test("createCategoryMap()", assert => {
  // Setup.
  const details = createGameDetails();

  // Run.
  const result = EntityUtils.createCategoryMap(details);

  // Verify.
  assert.ok(result);
  assert.equal(Object.keys(result).length, 9);
  assert.equal(result[1010].name, "Fantasy");
  assert.equal(result[1010].count, 1);
  assert.equal(result[1016].name, "Science Fiction");
  assert.equal(result[1016].count, 1);
  assert.equal(result[1021].name, "Economic");
  assert.equal(result[1021].count, 1);
  assert.equal(result[1046].name, "Fighting");
  assert.equal(result[1046].count, 2);
});

QUnit.test("createDesignerMap()", assert => {
  // Setup.
  const details = createGameDetails();

  // Run.
  const result = EntityUtils.createDesignerMap(details);

  // Verify.
  assert.ok(result);
  assert.equal(Object.keys(result).length, 2);
  assert.equal(result[16615].name, "R. Eric Reuss");
  assert.equal(result[16615].count, 1);
  assert.equal(result[62640].name, "Jamey Stegmaier");
  assert.equal(result[62640].count, 1);
});

QUnit.test("createMechanicMap()", assert => {
  // Setup.
  const details = createGameDetails();

  // Run.
  const result = EntityUtils.createMechanicMap(details);

  // Verify.
  assert.ok(result);
  assert.equal(Object.keys(result).length, 8);
  assert.equal(result[2004].name, "Set Collection");
  assert.equal(result[2004].count, 1);
  assert.equal(result[2015].name, "Variable Player Powers");
  assert.equal(result[2015].count, 2);
});

const EntityUtilitiesTest = {};
export default EntityUtilitiesTest;
