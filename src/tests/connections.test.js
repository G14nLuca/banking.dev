const database = require("../../infra/database");

test("Database connection test", async () => {
  const result = await database.query("SELECT 1+1 as SUMN");
  console.log(result.rows);
  expect(result.rows[0].sumn).toBe(2);
});
