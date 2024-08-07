const { environment: environment } = require("#utils/environment.js");
const requestManager = require("#utils/RequestManager.js");
const { combinedLogger, errorLogger } = require("#utils/logger.js");

require("dotenv").config({ path: ".env" });

describe("Test to Ensure API is up and running", () => {
  let responseStatus;
  let responseContentType;
  let responseData;

  beforeAll(async () => {
    // Usando requestManager.send ao invés de axios.get
    const response = await requestManager.send(
      "get",
      `${environment.version}`,
      {},
      {
        Authorization: `Bearer ${environment.access_token}`,
      }
    );

    responseStatus = response.status;
    responseContentType = response.headers["content-type"];
    responseData = response.data;
  });

  test("Status code is 200", () => {
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

  test("Response is JSON", () => {
    try {
      expect(responseContentType).toMatch(/json/);
      combinedLogger.info(`[${expect.getState().currentTestName}] : Sucesso`);
    } catch (error) {
      errorLogger.error(
        `[${expect.getState().currentTestName}] : Falha - ${error.message}`
      );
      throw error;
    }
  });

  test("Response structure", () => {
    try {
      expect(responseData).toHaveProperty("kind");
      expect(responseData.kind).toEqual("version");

      expect(responseData).toHaveProperty("data");
      expect(responseData.data).toBeInstanceOf(Array);

      responseData.data.forEach((item) => {
        expect(item).toBeInstanceOf(Object);
      });

      combinedLogger.info(`[${expect.getState().currentTestName}] : Sucesso`);
    } catch (error) {
      errorLogger.error(
        `[${expect.getState().currentTestName}] : Falha - ${error.message}`
      );
      throw error;
    }
  });
});
