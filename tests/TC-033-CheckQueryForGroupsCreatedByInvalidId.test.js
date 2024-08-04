const { environment: environment } = require("#utils/environment.js");
const requestManager = require("#utils/RequestManager.js");
const { combinedLogger, errorLogger } = require("#utils/logger.js");

// Test Case 033: Check Query For Groups Created by invalid ID - ENDPOINT GROUPS
describe("Check Query For Groups Created by invalid ID", () => {
  let responseStatus;
  let responseContentType;

  beforeAll(async () => {
    try {
      // Usando requestManager.send ao invés de axios.get
      const response = await requestManager.send(
        "get",
        `${environment.groups_endpoint}/ASDASD`,
        {},
        {
          Authorization: `Bearer ${environment.access_token}`,
        }
      );
      // Se o código chegar aqui, significa que a resposta foi 2xx, o que não é esperado neste teste
      responseStatus = response.status;
      responseContentType = response.headers["content-type"];
    } catch (error) {
      if (error.response) {
        // Erro gerado por uma resposta fora do intervalo 2xx, como esperado para este teste
        responseStatus = error.response.status;
        responseContentType = error.response.headers["content-type"];
      } else {
        // Erro ao enviar a requisição, não relacionado ao status da resposta
        console.error("Error sending request:", error.message);
      }
    }
  });

  test("@error Status code is 400", () => {
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

  test("@smoke Response is JSON", () => {
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
});
