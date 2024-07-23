require("dotenv").config({ path: ".env" });
const requestManager = require('../utils/RequestManager.js');

// Test Case 001: Verify If All Of The Folder Tree Is Returned - ENDPOINT FOLDERS
describe("Verify If All Of The Folder Tree Is Returned", () => {
  let response;

  beforeAll(async () => {
    response = await requestManager.send('get', `${process.env.FOLDER_ENDPOINT}`, {}, {
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    });
  });

  test("Status code is 200", () => {
    expect(response.status).toBe(200);
  });

  test("Response is JSON", () => {
    expect(response.headers["content-type"]).toMatch(/json/);
  });

  test("Response contains folderTree kind", () => {
    expect(response.data.kind).toEqual("folderTree");
  });

  test("Data is an array", () => {
    expect(Array.isArray(response.data.data)).toBe(true);
  });
});