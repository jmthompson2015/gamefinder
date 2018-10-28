import GameDetail from "../artifact/GameDetail.js";

import EntityUtils from "./EntityUtilities.js";

QUnit.module("EntityUtilities");

const createGameDetails = () => [
  GameDetail[169786], // Scythe
  GameDetail[162886] // Spirit Island
];

const verifyEntity = (assert, entity, id, name, count) => {
  assert.ok(entity);
  assert.equal(entity.id, id, `${name} id`);
  assert.equal(entity.name, name, `${name} name`);
  assert.equal(entity.count, count, `${name} count`);
};

QUnit.test("createCategoryMap()", assert => {
  // Setup.
  const details = createGameDetails();

  // Run.
  const result = EntityUtils.createCategoryMap(details);

  // Verify.
  assert.ok(result);
  assert.equal(Object.keys(result).length, 9);
  verifyEntity(assert, result[1010], 1010, "Fantasy", 1);
  verifyEntity(assert, result[1016], 1016, "Science Fiction", 1);
  verifyEntity(assert, result[1021], 1021, "Economic", 1);
  verifyEntity(assert, result[1046], 1046, "Fighting", 2);
  verifyEntity(assert, result[1070], 1070, "Renaissance", 1);
  verifyEntity(assert, result[1082], 1082, "Mythology", 1);
  verifyEntity(assert, result[1084], 1084, "Environmental", 1);
  verifyEntity(assert, result[1086], 1086, "Territory Building", 2);
  verifyEntity(assert, result[2726], 2726, "Age of Reason", 1);
});

QUnit.test("createDesignerMap()", assert => {
  // Setup.
  const details = createGameDetails();

  // Run.
  const result = EntityUtils.createDesignerMap(details);

  // Verify.
  assert.ok(result);
  assert.equal(Object.keys(result).length, 2);
  verifyEntity(assert, result[16615], 16615, "R. Eric Reuss", 1);
  verifyEntity(assert, result[62640], 62640, "Jamey Stegmaier", 1);
});

QUnit.test("createMechanicMap()", assert => {
  // Setup.
  const details = createGameDetails();

  // Run.
  const result = EntityUtils.createMechanicMap(details);

  // Verify.
  assert.ok(result);
  assert.equal(Object.keys(result).length, 8);
  verifyEntity(assert, result[2004], 2004, "Set Collection", 1);
  verifyEntity(assert, result[2011], 2011, "Modular Board", 1);
  verifyEntity(assert, result[2015], 2015, "Variable Player Powers", 2);
  verifyEntity(assert, result[2020], 2020, "Simultaneous Action Selection", 1);
  verifyEntity(assert, result[2023], 2023, "Cooperative Play", 1);
  verifyEntity(assert, result[2040], 2040, "Hand Management", 1);
  verifyEntity(assert, result[2080], 2080, "Area Control / Area Influence", 2);
  verifyEntity(assert, result[2676], 2676, "Grid Movement", 1);
});

const EntityUtilitiesTest = {};
export default EntityUtilitiesTest;
