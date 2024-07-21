require("dotenv").config({ path: ".env" });
const axios = require("axios");

// Test Case 011: Get Space With ID - ENDPOINT SPACES
describe("Get Space With ID", () => {
  let response;

  beforeAll(async () => {
    response = await axios.get(`${process.env.SPACES_ENDPOINT}`, {
      headers: { Authorization: `Bearer ${process.env.ACCESS_TOKEN}` },
    });
  });

  test("Status code is 200", () => {
    expect(response.status).toBe(200);
  });

  test("Response is JSON", () => {
    expect(response.headers["content-type"]).toMatch(/json/);
  });

  test("Response contains spaces kind", () => {
    expect(response.data.kind).toEqual("spaces");
  });

  test("Data is an array", () => {
    expect(Array.isArray(response.data.data)).toBe(true);
  });
});
