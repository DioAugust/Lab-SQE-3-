const winston = require("winston");
const {configuration} = require("#utils/environment.js");
const path = require("path");

// Não mandarei imprimir no console, apenas em arquivos.
// O Jest já faz isso por padrão, então não é necessário duplicar a saída.
const combinedLogger = winston.createLogger({
    level: configuration.logger,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(
            ({timestamp, level, message}) => `${timestamp} ${level}: ${message}`
        )
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: path.join(__dirname, "../logs/combined.log"),
        }),
    ],
});

const errorLogger = winston.createLogger({
    level: "error",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(
            ({timestamp, level, message}) => `${timestamp} ${level}: ${message}`
        )
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: path.join(__dirname, "../logs/error.log"),
        }),
    ],
});

module.exports = {combinedLogger, errorLogger};
