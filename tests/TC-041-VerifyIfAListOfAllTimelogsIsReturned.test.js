const { environment: environment } = require("#utils/environment.js");
const requestManager = require("#utils/RequestManager.js");
const { combinedLogger, errorLogger } = require("#utils/logger.js");
const timelogSchema = require("#application/schemas/timelogs.json");

// Test Case 041: Verify If A List Of All Timelogs Is Returned - ENDPOINT TIMELOGS
describe("Verify If A List Of All Timelogs is Returned", () => {
  let response;

  beforeAll(async () => {
    // Usando requestManager.send ao invés de axios.get
    response = await requestManager.send(
      "get",
      `${environment.timelogs_endpoint}`,
      {},
      {
        Authorization: `Bearer ${environment.access_token}`,
      }
    );
  });

  test("@smoke Status code is 200", () => {
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

  test("@smoke Response is JSON", () => {
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

  test("@integration Response contains spaces kind", () => {
    try {
      expect(response.data.kind).toEqual("timelogs");
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
      expect(Array.isArray(response.data.data)).toBe(true);
      combinedLogger.info(`[${expect.getState().currentTestName}] : Sucesso`);
    } catch (error) {
      errorLogger.error(
        `[${expect.getState().currentTestName}] : Falha - ${error.message}`
      );
      throw error;
    }
  });

  test("@schema Response matches schema", () => {
    expect(response.data).toBeValidSchema();
    expect(response.data).toMatchSchema(timelogSchema);
  });
});
