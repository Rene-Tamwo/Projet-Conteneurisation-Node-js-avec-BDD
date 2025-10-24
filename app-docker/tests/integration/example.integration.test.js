const request = require("supertest");
const { init, pool } = require("../../src/db");
const app = require("../../src/index");

beforeAll(async () => {
  // The DB must be reachable (docker-compose or CI service)
  await init();
  // clean table
  await pool.query("TRUNCATE TABLE items");
});

afterAll(async () => {
  await pool.end();
});

describe("integration items", () => {
  it("create and list item", async () => {
    const create = await request(app).post("/items").send({ name: "test1" });
    expect(create.status).toBe(201);
    expect(create.body).toHaveProperty("id");
    const list = await request(app).get("/items");
    expect(list.status).toBe(200);
    expect(Array.isArray(list.body)).toBeTruthy();
    expect(list.body.length).toBeGreaterThanOrEqual(1);
  });
});

