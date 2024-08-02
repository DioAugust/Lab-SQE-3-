const { environment: environment } = require("#utils/environment.js");
const requestManager = require("#utils/RequestManager.js");
const { combinedLogger, errorLogger } = require("#utils/logger.js");

// Test Case 024: Basic Test To Ensure Api Service - ENDPOINT WORK SCHEDULES
describe("Basic Test To Ensure Api Service", () => {
  let response;

  beforeAll(async () => {
    response = await requestManager.send(
      "get",
      `${environment.basic_test_endpoint}`,
      {},
      {
        Authorization: `Bearer ${environment.access_token}`,
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
      errorLogger.error(`
        [${expect.getState().currentTestName}] : Falha - ${error.message}`);
      throw error;
    }
  });

  test("Response contains version kind", () => {
    try {
      expect(response.data.kind).toEqual("version");
      combinedLogger.info(` [${expect.getState().currentTestName}] : Sucesso`);
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
        `[${expect.getState().currentTestName}] : Falha - ${error.message}`
      );
      throw error;
    }
  });
});
