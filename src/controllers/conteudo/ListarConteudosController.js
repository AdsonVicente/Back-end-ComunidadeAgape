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
exports.ListarConteudosController = void 0;
const ListarConteudosService_1 = require("../../services/conteudo/ListarConteudosService");
class ListarConteudosController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const listarConteudosService = new ListarConteudosService_1.ListarConteudosService();
                const conteudos = yield listarConteudosService.execute();
                return response.status(200).json(conteudos);
            }
            catch (error) {
                console.error("Erro ao listar conteúdos:", error);
                return response.status(500).json({ error: "Erro ao listar conteúdos" });
            }
        });
    }
}
exports.ListarConteudosController = ListarConteudosController;
