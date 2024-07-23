const requestManager = require("../utils/RequestManager.js");

// Test Case 033: Check Query For Groups Created by invalid ID - ENDPOINT GROUPS
describe("Check Query For Groups Created by invalid ID", () => {
  let responseStatus;
  let responseContentType;

  beforeAll(async () => {
    try {
      // Usando requestManager.send ao invés de axios.get
      const response = await requestManager.send(
        "get",
        `${process.env.GROUPS_ENDPOINT}`,
        {},
        {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
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

  test("Status code is 400", () => {
    expect(responseStatus).toBe(400);
  });

  test("Response is JSON", () => {
    expect(responseContentType).toMatch(/json/);
  });
});
