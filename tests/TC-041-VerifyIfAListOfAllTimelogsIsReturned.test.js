require("dotenv").config({ path: ".env" });
const axios = require("axios");

// Test Case 041: Verify If A List Of All Timelogs Is Returned - ENDPOINT TIMELOGS
describe("Verify If A List Of All Timelogs is Returned", () => {
  let response;

  beforeAll(async () => {
      response = await axios.get(`${process.env.TIMELOGS_ENDPOINT}`, {
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
    expect(response.data.kind).toEqual("timelogs");
  });

  test("Data is an array", () => {
    expect(Array.isArray(response.data.data)).toBe(true);
  });
});
