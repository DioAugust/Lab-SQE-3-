const { configuration, environment } = require("#utils/environment.js");
const { combinedLogger, errorLogger} = require("#utils/logger.js");
const { matchersWithOptions } = require("jest-json-schema");

expect.extend(matchersWithOptions());

beforeAll(async () => {
  combinedLogger.info("Starting test session...");
  combinedLogger.debug(`Base URL: ${environment.base_url}
        Environment UAT: ${configuration.environment} 
        Timeout Set: ${configuration.timeout}`);
});

afterAll(async () => {
  combinedLogger.info("Finished test session.");
});
