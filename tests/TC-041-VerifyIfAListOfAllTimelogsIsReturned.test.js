require("dotenv").config({ path: ".env" });
const requestManager = require("../utils/RequestManager.js");

// Test Case 041: Verify If A List Of All Timelogs Is Returned - ENDPOINT TIMELOGS
describe("Verify If A List Of All Timelogs is Returned", () => {
  let response;

  beforeAll(async () => {
    // Usando requestManager.send ao invés de axios.get
    response = await requestManager.send(
      "get",
      process.env.TIMELOGS_ENDPOINT,
      {},
      {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      }
    );
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
