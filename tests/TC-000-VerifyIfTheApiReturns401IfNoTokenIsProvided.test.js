require("dotenv").config({ path: ".env" });
const requestManager = require("../utils/RequestManager.js");
const { combinedLogger, errorLogger } = require("../utils/logger"); // Importa os loggers

describe("Verify 401 response if no token is given", () => {
  let responseStatus;
  let responseContentType;
  let responseData;

  beforeAll(async () => {
    try {
      // Usando requestManager.send ao invés de axios.get, intencionalmente omitindo o token para forçar um erro 401
      await requestManager.send("get", `${process.env.GROUPS_ENDPOINT}`);
    } catch (error) {
      if (error.response) {
        responseStatus = error.response.status;
        responseContentType = error.response.headers["content-type"];
        responseData = error.response.data; // Armazenando os dados da resposta para testes subsequentes
      } else {
        console.error("Error sending request:", error.message);
      }
    }
  });

  test("Status code is 401", () => {
    try {
      expect(responseStatus).toBe(401);
      combinedLogger.info(`[${expect.getState().currentTestName}] : Sucesso`);
    } catch (error) {
      errorLogger.error(
        `[${expect.getState().currentTestName}] : Falha - ${error.message}`
      );
      throw error;
    }
  });

  test("Response is Text/Plain", () => {
    try {
      expect(responseContentType).toMatch(/text\/plain/);
      combinedLogger.info(`[${expect.getState().currentTestName}] : Sucesso`);
    } catch (error) {
      errorLogger.error(
        `[${expect.getState().currentTestName}] : Falha - ${error.message}`
      );
      throw error;
    }
  });

  test("Response contains error message", () => {
    try {
      expect(responseData.error).toEqual("not_authorized");
      combinedLogger.info(`[${expect.getState().currentTestName}] : Sucesso`);
    } catch (error) {
      errorLogger.error(
        `[${expect.getState().currentTestName}] : Falha - ${error.message}`
      );
      throw error;
    }
  });

  test("Response contains error description", () => {
    try {
      expect(responseData.errorDescription).toEqual(
        "Authorization method unknown"
      );
      combinedLogger.info(`[${expect.getState().currentTestName}] : Sucesso`);
    } catch (error) {
      errorLogger.error(
        `[${expect.getState().currentTestName}] : Falha - ${error.message}`
      );
      throw error;
    }
  });
});
