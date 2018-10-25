import Designer from "./Designer.js";

QUnit.module("Designer");

QUnit.test("Designer properties Stefan Feld", assert => {
  // Setup.
  const id = 4958;

  // Run.
  const designer = Designer[id];

  // Verify.
  assert.equal(designer.id, id);
  assert.equal(designer.name, "Stefan Feld");
});

QUnit.test("Designer keys", assert => {
  // Setup.
  const length = 698;

  // Run.
  const keys = Object.keys(Designer);

  // Verify.
  assert.equal(keys.length, length);

  const designer0 = Designer[keys[0]];
  assert.equal(designer0.id, 1);
  assert.equal(designer0.name, "Karl-Heinz Schmiel");

  const designerLast = Designer[keys[length - 1]];
  assert.equal(designerLast.id, 108405);
  assert.equal(designerLast.name, "Jakub Łapot");
});

const DesignerTest = {};
export default DesignerTest;
