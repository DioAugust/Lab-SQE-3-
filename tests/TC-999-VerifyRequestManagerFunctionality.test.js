const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const requestManager = require("#utils/RequestManager.js");

jest.mock("#utils/logger.js", () => ({
  combinedLogger: {
    info: jest.fn(),
    debug: jest.fn(),
  },
  errorLogger: {
    error: jest.fn(),
  },
}));

describe("Assure Request Manager Functionality", () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(requestManager.axios);
  });

  afterEach(() => {
    mock.reset();
  });

  test("should send a GET request successfully", async () => {
    const mockData = { data: "mocked data" };
    mock.onGet("/endpoint").reply(200, mockData);

    const response = await requestManager.send("get", "endpoint", {
      param1: "value1",
    });

    expect(response.status).toBe(200);
    expect(response.data).toEqual(mockData);
    expect(
      require("#utils/logger.js").combinedLogger.info
    ).toHaveBeenCalledWith(
      "Send GET request to https://www.wrike.com/api/v4/endpoint"
    );
    expect(
      require("#utils/logger.js").combinedLogger.debug
    ).toHaveBeenCalledWith('Request params: {"param1":"value1"}');
  });

  test("should handle request error", async () => {
    mock.onGet("/endpoint/error").reply(500);

    await expect(
      requestManager.send("get", "endpoint/error")
    ).rejects.toThrow();

    expect(require("#utils/logger.js").errorLogger.error).toHaveBeenCalledWith(
      "Request failed: Request failed with status code 500"
    );
  });

  test("should send a POST request successfully", async () => {
    const mockData = { data: "post success" };
    mock.onPost("/post-endpoint").reply(201, mockData);

    const response = await requestManager.send("post", "post-endpoint", {
      param1: "value1",
    });

    expect(response.status).toBe(201);
    expect(response.data).toEqual(mockData);
    expect(
      require("#utils/logger.js").combinedLogger.info
    ).toHaveBeenCalledWith(
      "Send POST request to https://www.wrike.com/api/v4/post-endpoint"
    );
    expect(
      require("#utils/logger.js").combinedLogger.debug
    ).toHaveBeenCalledWith('Request params: {"param1":"value1"}');
  });

  test("should handle network error", async () => {
    mock.onGet("/network-error").networkError();

    await expect(
      requestManager.send("get", "network-error")
    ).rejects.toThrow();

    expect(require("#utils/logger.js").errorLogger.error).toHaveBeenCalledWith(
      "Request failed: Network Error"
    );
  });
});
