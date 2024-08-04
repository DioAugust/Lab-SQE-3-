const { environment: environment } = require("#utils/environment.js");
const requestManager = require("#utils/RequestManager.js");
const { combinedLogger, errorLogger } = require("#utils/logger.js"); // Importa os loggers

// Test Case 001: Verify If All Of The Folder Tree Is Returned - ENDPOINT FOLDERS
describe("Verify If All Of The Folder Tree Is Returned", () => {
  let response;

  beforeAll(async () => {
    response = await requestManager.send(
      "get",
      `${environment.folder_endpoint}`,
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

  test("@regression Response contains folderTree kind", () => {
    try {
      expect(response.data.kind).toEqual("folderTree");
      combinedLogger.info(`[${expect.getState().currentTestName}] : Sucesso`);
    } catch (error) {
      errorLogger.error(
        `[${expect.getState().currentTestName}] : Falha - ${error.message}`
      );
      throw error;
    }
  });

  test("@regression Data is an array", () => {
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
