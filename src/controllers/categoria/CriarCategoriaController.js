"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CriarCategoriaService_1 = __importDefault(require("../../services/categoria/CriarCategoriaService"));
class CriarCategoriaController {
    async handle(request, response) {
        const criarCategoriaService = new CriarCategoriaService_1.default();
        const { nome } = request.body;
        const categoria = await criarCategoriaService.execute({ nome });
        return response.json(categoria);
    }
}
exports.default = CriarCategoriaController;
