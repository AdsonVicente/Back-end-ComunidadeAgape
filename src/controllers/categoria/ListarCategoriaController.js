"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListarCategoriaController = void 0;
const ListarCategoriaService_1 = require("../../services/categoria/ListarCategoriaService");
class ListarCategoriaController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const listarCategoriasService = new ListarCategoriaService_1.ListarCategoriaService();
            const categorias = yield listarCategoriasService.execute();
            return response.json(categorias);
        });
    }
}
exports.ListarCategoriaController = ListarCategoriaController;
