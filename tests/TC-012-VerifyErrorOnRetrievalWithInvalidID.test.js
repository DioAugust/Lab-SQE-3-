require("dotenv").config({ path: ".env" });
const requestManager = require("../utils/RequestManager.js");
const { combinedLogger, errorLogger } = require("../utils/logger");

describe("Verify Wrike API response for invalid space ID", () => {
  let responseStatus;
  let responseContentType;
  let responseData;

  beforeAll(async () => {
    try {
      const response = await requestManager.send(
        "get",
        `${process.env.BASE_URL}/spaces/IEAGHUACI5LGL`,
        {},
        { Authorization: `Bearer ${process.env.ACCESS_TOKEN}` }
      );
      responseStatus = response.status;
      responseContentType = response.headers["content-type"];
      responseData = response.data;
    } catch (error) {
      if (error.response) {
        responseStatus = error.response.status;
        responseContentType = error.response.headers["content-type"];
        responseData = error.response.data;
      } else {
        console.error("Error sending request:", error.message);
      }
    }
  });

  test("Status code is 400", () => {
    try {
      expect(responseStatus).toBe(400);
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
      expect(responseContentType).toMatch(/application\/json/);
      combinedLogger.info(`[${expect.getState().currentTestName}] : Sucesso`);
    } catch (error) {
      errorLogger.error(
        `[${expect.getState().currentTestName}] : Falha - ${error.message}`
      );
      throw error;
    }
  });

  test("errorDescription contains error message", () => {
    try {
      expect(responseData.errorDescription).toEqual("Invalid Space ID");
      combinedLogger.info(`[${expect.getState().currentTestName}] : Sucesso`);
    } catch (error) {
      errorLogger.error(
        `[${expect.getState().currentTestName}] : Falha - ${error.message}`
      );
      throw error;
    }
  });
});
