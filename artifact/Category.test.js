import Category from "./Category.js";

QUnit.module("Category");

QUnit.test("Category properties Science Fiction", (assert) => {
  // Setup.
  const id = 1016;

  // Run.
  const category = Category[id];

  // Verify.
  assert.equal(category.id, id);
  assert.equal(category.name, "Science Fiction");
});

QUnit.test("Category keys", (assert) => {
  // Setup.
  const length = 79;

  // Run.
  const keys = Object.keys(Category);

  // Verify.
  assert.equal(keys.length, length);

  const category0 = Category[keys[0]];
  assert.equal(category0.id, 1001);
  assert.equal(category0.name, "Political");

  const categoryLast = Category[keys[length - 1]];
  assert.equal(categoryLast.id, 2726);
  assert.equal(categoryLast.name, "Age of Reason");
});

const CategoryTest = {};
export default CategoryTest;
