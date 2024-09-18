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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const resend_1 = require("resend");
// Inicializa Resend con tu API Key
const resend = new resend_1.Resend('re_LHbxvbx5_JzneUZKyrMW9fA5rwuGCy1Vn');
const app = (0, express_1.default)();
// Middleware para permitir CORS y manejar JSON
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Ruta para manejar el envío de correos
app.post('/send-email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, message } = req.body;
    try {
        const { data, error } = yield resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: [email], // A dónde enviarás el correo
            subject: `Nuevo Mensaje de ${name}`,
            html: `<strong>Nombre:</strong> ${name}<br/><strong>Email:</strong> ${email}<br/><strong>Mensaje:</strong> ${message}`,
        });
        if (error) {
            return res.status(400).json({ error: 'Error al enviar el correo', details: error });
        }
        res.status(200).json({ message: 'Correo enviado exitosamente', data });
    }
    catch (err) {
        res.status(500).json({ error: 'Hubo un error al enviar el correo', details: err });
    }
}));
// Inicia el servidor en el puerto 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
//Ejecuta esto npx ts-node-dev src/index.ts
