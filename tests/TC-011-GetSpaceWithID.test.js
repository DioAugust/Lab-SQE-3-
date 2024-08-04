const { environment: environment } = require("#utils/environment.js");
const requestManager = require("#utils/RequestManager.js");
const { combinedLogger, errorLogger } = require("#utils/logger.js");
const spaceSchema = require("#application/schemas/space.json");

// Test Case 011: Get Space With ID - ENDPOINT SPACES
describe("Get Space With ID", () => {
  let response;

  beforeAll(async () => {
    response = await requestManager.send(
      "get",
      `${environment.spaces_endpoint}`,
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
      expect(response.data.kind).toEqual("spaces");
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
        `[${expect.getState().currentTestName}] Data is an array: Falha - ${
          error.message
        }`
      );
      throw error;
    }
  });

  test("@schema Responses matches schema", () => {
    expect(response.data).toBeValidSchema();
    expect(response.data).toMatchSchema(spaceSchema);
  });
});
