require("dotenv").config({ path: ".env" });
const requestManager = require("../utils/RequestManager.js");
const { combinedLogger, errorLogger } = require("../utils/logger");

// Test Case 011: Get Space With ID - ENDPOINT SPACES
describe("Get Space With ID", () => {
  let response;

  beforeAll(async () => {
    response = await requestManager.send(
      "get",
      `${process.env.SPACES_ENDPOINT}`,
      {},
      {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      }
    );
  });

  test("Status code is 200", () => {
    try {
      expect(response.status).toBe(200);
      combinedLogger.info(`[${expect.getState().currentTestName}] : Sucesso`);
    } catch (error) {
      errorLogger.error(
        `[${expect.getState().currentTestName}] : Falha - ${error.message}`
      );
      throw error;
    }
  });

  test("Response is JSON", () => {
    try {
      expect(response.headers["content-type"]).toMatch(/json/);
      combinedLogger.info(`[${expect.getState().currentTestName}] : Sucesso`);
    } catch (error) {
      errorLogger.error(
        `[${expect.getState().currentTestName}] : Falha - ${error.message}`
      );
      throw error;
    }
  });

  test("Response contains spaces kind", () => {
    try {
      expect(response.data.kind).toEqual("spaces");
      combinedLogger.info(`[${expect.getState().currentTestName}] : Sucesso`);
    } catch (error) {
      errorLogger.error(
        `[${expect.getState().currentTestName}] : Falha - ${error.message}`
      );
      throw error;
    }
  });

  test("Data is an array", () => {
    try {
      expect(Array.isArray(response.data.data)).toBe(true);
      combinedLogger.info(`[${expect.getState().currentTestName}] : Sucesso`);
    } catch (error) {
      errorLogger.error(
        `[${expect.getState().currentTestName}] Data is an array: Falha - ${
          error.message
        }`
      );
      throw error;
    }
  });
});
