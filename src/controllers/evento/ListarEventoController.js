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
exports.ListarEventosController = void 0;
const ListarEventosService_1 = require("../../services/evento/ListarEventosService");
class ListarEventosController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const listarEventosService = new ListarEventosService_1.ListarEventosService();
            const eventos = yield listarEventosService.execute();
            return res.json(eventos);
        });
    }
}
exports.ListarEventosController = ListarEventosController;
