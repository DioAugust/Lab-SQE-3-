require("dotenv").config({ path: ".env" });
const axios = require("axios");

// Test Case 024: Basic Test To Ensure Api Service - ENDPOINT WORK SCHEDULES
describe("Basic Test To Ensure Api Service", () => {
  let response;

  beforeAll(async () => {
    response = await axios.get(`${process.env.BASIC_TEST_ENDPOINT}`, {
      headers: { Authorization: `Bearer ${process.env.ACCESS_TOKEN}` },
    });
  });

  test("Status code is 200", () => {
    expect(response.status).toBe(200);
  });

  test("Response is JSON", () => {
    expect(response.headers["content-type"]).toMatch(/json/);
  });

  test("Response contains version kind", () => {
    expect(response.data.kind).toEqual("version");
  });

  test("Data is an array", () => {
    expect(Array.isArray(response.data.data)).toBe(true);
  });
});
