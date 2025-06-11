import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

// Caminho da imagem de teste
const imagePath = path.resolve(__dirname, 'imagem-teste.jpg'); // coloque uma imagem real aqui
const imageStream = fs.createReadStream(imagePath);

// Substitua pelo seu token JWT válido
const token = '';

const form = new FormData();
form.append('titulo', 'Teste de conteúdo via script');
form.append('descricao', 'Conteúdo criado via script automatizado');
form.append('categoria', 'a796a587-7615-4aa5-8cc2-ebbde5891ad9'); // Substitua por um ID real
form.append('autor', 'Administrador de Teste');
form.append('file', imageStream); // nome deve ser igual ao usado no multer (upload.single("file"))

axios.post('http://localhost:3333/conteudo', form, {
  headers: {
    ...form.getHeaders(),
    Authorization: `Bearer ${token}`,
  },
}).then(response => {
  console.log('✅ Conteúdo criado com sucesso:', response.data);
}).catch(error => {
  if (error.response) {
    console.error('❌ Erro na resposta:', error.response.data);
  } else {
    console.error('❌ Erro inesperado:', error.message);
  }
});
