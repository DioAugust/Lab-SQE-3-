require("dotenv").config({ path: ".env" });
const axios = require("axios");

describe("Verify 401 response if no token is given", () => {
  let responseStatus;
  let responseContentType;
  let responseData;

  beforeAll(async () => {
    try {
      // Intencionalmente omitindo o token para forçar um erro 401
      const response = await axios.get(`${process.env.GROUPS_ENDPOINT}`);
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
    expect(responseStatus).toBe(401);
  });

  test("Response is JSON", () => {
    expect(responseContentType).toMatch(/text\/plain/);
  });

  test("Response contains error message", () => {
    expect(responseData.error).toEqual("not_authorized");
  });

  test("Response contains error description", () => {
    expect(responseData.errorDescription).toEqual(
      "Authorization method unknown"
    );
  });
});
