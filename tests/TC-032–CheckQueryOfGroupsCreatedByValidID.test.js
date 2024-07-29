const requestManager = require("../utils/RequestManager.js");
const { combinedLogger, errorLogger } = require("../utils/logger");

require("dotenv").config({ path: ".env" });

describe("", () => {
  let responseStatus;
  let responseContentType;
  let responseData;

  beforeAll(async () => {
    // Usando requestManager.send ao invés de axios.get
    const response = await requestManager.send(
      "get",
      `${process.env.GROUPS_ENDPOINT}/KX7XYC4U`,
      {},
      {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
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
      errorLogger.error(`[${expect.getState().currentTestName}] : Falha - ${error.message}`
      );
      throw error;
    }
  });

  test("Response structure", () => {
    try {
      expect(responseData).toHaveProperty("kind");
      expect(responseData.kind).toEqual("groups");

      expect(responseData).toHaveProperty("data");
      expect(responseData.data).toBeInstanceOf(Array);

      responseData.data.forEach(item => {
        expect(item).toBeInstanceOf(Object);
      });

      combinedLogger.info(`[${expect.getState().currentTestName}] : Sucesso`);
    } catch (error) {
      errorLogger.error(`[${expect.getState().currentTestName}] : Falha - ${error.message}`
      );
      throw error;
    }
  });
});