import Designer from "./Designer.js";

QUnit.module("Designer");

QUnit.test("Designer properties Stefan Feld", (assert) => {
  // Setup.
  const id = 4958;

  // Run.
  const designer = Designer[id];

  // Verify.
  assert.equal(designer.id, id);
  assert.equal(designer.name, "Stefan Feld");
});

QUnit.test("Designer keys", (assert) => {
  // Setup.

  // Run.
  const keys = Object.keys(Designer);

  // Verify.
  assert.equal(keys.length, 1132);

  const designer0 = Designer[R.head(keys)];
  assert.equal(designer0.id, 1);
  assert.equal(designer0.name, "Karl-Heinz Schmiel");

  const designerLast = Designer[R.last(keys)];
  assert.equal(designerLast.id, 131941);
  assert.equal(designerLast.name, "Hisanori Hiraoka");
});

const DesignerTest = {};
export default DesignerTest;
