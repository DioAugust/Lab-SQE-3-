const { environment: environment } = require("#utils/environment.js");
const requestManager = require("#utils/RequestManager.js");
const { combinedLogger, errorLogger } = require("#utils/logger.js");

describe("Verify Wrike API response for spaces", () => {
  let responseStatus;
  let responseContentType;
  let responseData;

  beforeAll(async () => {
    try {
      const response = await requestManager.send(
        "get",
        `${environment.spaces_endpoint}`,
        {},
        { Authorization: `Bearer ${environment.access_token}` }
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

  test("@smoke Status code is 200", () => {
    try {
      expect(responseStatus).toBe(200);
      combinedLogger.info(`[${expect.getState().currentTestName}] : Sucesso`);
    } catch (error) {
      errorLogger.error(
        `[${expect.getState().currentTestName}] : Falha - ${error.message}`
      );
      throw error;
    }
  });

  test("@smoke Response is JSON", () => {
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

  test("@integration Response contains spaces kind", () => {
    try {
      expect(responseData.kind).toEqual("spaces");
      combinedLogger.info(`[${expect.getState().currentTestName}] : Sucesso`);
    } catch (error) {
      errorLogger.error(
        `[${expect.getState().currentTestName}] : Falha - ${error.message}`
      );
      throw error;
    }
  });

  test("@integration Data is an array", () => {
    try {
      expect(Array.isArray(responseData.data)).toBe(true);
      combinedLogger.info(`[${expect.getState().currentTestName}] : Sucesso`);
    } catch (error) {
      errorLogger.error(
        `[${expect.getState().currentTestName}] : Falha - ${error.message}`
      );
      throw error;
    }
  });
});
