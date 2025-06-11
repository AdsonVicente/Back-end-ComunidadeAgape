"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Caminho da imagem de teste
const imagePath = path_1.default.resolve(__dirname, 'imagem-teste.jpg'); // coloque uma imagem real aqui
const imageStream = fs_1.default.createReadStream(imagePath);
// Substitua pelo seu token JWT válido
const token = '';
const form = new form_data_1.default();
form.append('titulo', 'Teste de conteúdo via script');
form.append('descricao', 'Conteúdo criado via script automatizado');
form.append('categoria', 'a796a587-7615-4aa5-8cc2-ebbde5891ad9'); // Substitua por um ID real
form.append('autor', 'Administrador de Teste');
form.append('file', imageStream); // nome deve ser igual ao usado no multer (upload.single("file"))
axios_1.default.post('http://localhost:3333/conteudo', form, {
    headers: Object.assign(Object.assign({}, form.getHeaders()), { Authorization: `Bearer ${token}` }),
}).then(response => {
    console.log('✅ Conteúdo criado com sucesso:', response.data);
}).catch(error => {
    if (error.response) {
        console.error('❌ Erro na resposta:', error.response.data);
    }
    else {
        console.error('❌ Erro inesperado:', error.message);
    }
});
