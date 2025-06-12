"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const api_errors_1 = require("../utils/api-errors");
function errorHandler(err, req, res, next) {
    if (err instanceof api_errors_1.ApiError) {
        return res.status(err.statusCode).json({ error: err.message });
    }
    console.error(err);
    return res.status(500).json({ error: 'Erro interno no servidor' });
}
