require("dotenv").config({ path: ".env" });
const axios = require("axios");

// Test Case 033: Check Query For Groups created by invalid ID - ENDPOINT GROUPS
describe("Check Query For Groups Created by invalid ID", () => {
  let responseStatus;
  let responseContentType;

  beforeAll(async () => {
    try {
      const response = await axios.get(`${process.env.GROUPS_ENDPOINT}`, {
        headers: { Authorization: `Bearer ${process.env.ACCESS_TOKEN}` },
      });
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
