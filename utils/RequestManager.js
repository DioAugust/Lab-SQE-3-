const axios = require("axios");
const {environment, configuration} = require(`#utils/environment.js`);
const {combinedLogger, errorLogger} = require(`#utils/logger.js`);

class RequestManager {
    constructor(baseURL, headers = {}, timeout = configuration.timeout) {
        if (RequestManager._instance) {
            return RequestManager._instance;
        }
        RequestManager._instance = this;

        this.axios = axios.create({
            baseURL,
            headers,
            timeout,
        });
    }

    async send(method, endpoint, params, headers) {
        combinedLogger.info(`Send ${method.toUpperCase()} request to ${this.axios.defaults.baseURL + endpoint}`);
        if (params) combinedLogger.debug(`Request params: ${JSON.stringify(params)}`);
        if (headers) combinedLogger.debug(`Request headers: ${JSON.stringify(headers)}`);

        try {
            const response = await this.axios.request({
                method: method,
                url: endpoint,
                params: params,
                headers: headers
            });
            combinedLogger.debug(`Request response data: ${JSON.stringify(response.data)}`);
            return response;
        } catch (error) {
            errorLogger.error(`Request failed: ${error.message}`);
            throw error;
        }
    }
}

const requestManager = new RequestManager(environment.base_url);
module.exports = requestManager;
