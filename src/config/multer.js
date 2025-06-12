"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
exports.default = {
    upload() {
        return (0, multer_1.default)({
            storage: multer_1.default.memoryStorage(), // <-- importante para ter req.file.buffer
            limits: { fileSize: 5 * 1024 * 1024 },
            fileFilter: (req, file, cb) => {
                const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
                if (allowedMimes.includes(file.mimetype)) {
                    cb(null, true);
                }
                else {
                    cb(new Error('Tipo de arquivo inválido.'));
                }
            }
        });
    }
};
