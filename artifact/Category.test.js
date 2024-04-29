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

  // Run.
  const keys = Object.keys(Category);

  // Verify.
  assert.equal(keys.length, 81);

  const category0 = Category[R.head(keys)];
  assert.equal(category0.id, 1001);
  assert.equal(category0.name, "Political");

  const categoryLast = Category[R.last(keys)];
  assert.equal(categoryLast.id, 2726);
  assert.equal(categoryLast.name, "Age of Reason");
});

const CategoryTest = {};
export default CategoryTest;
