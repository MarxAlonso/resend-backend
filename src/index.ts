import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';

// Inicializa Resend con tu API Key
const resend = new Resend('re_LHbxvbx5_JzneUZKyrMW9fA5rwuGCy1Vn');

const app = express();

// Middleware para permitir CORS y manejar JSON
app.use(cors());
app.use(express.json());

// Ruta para manejar el envío de correos
app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email], // A dónde enviarás el correo
      subject: `Nuevo Mensaje de ${name}`,
      html: `<strong>Nombre:</strong> ${name}<br/><strong>Email:</strong> ${email}<br/><strong>Mensaje:</strong> ${message}`,
    });

    if (error) {
      return res.status(400).json({ error: 'Error al enviar el correo', details: error });
    }

    res.status(200).json({ message: 'Correo enviado exitosamente', data });
  } catch (err) {
    res.status(500).json({ error: 'Hubo un error al enviar el correo', details: err });
  }
});

// Inicia el servidor en el puerto 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

//Ejecuta esto npx ts-node-dev src/index.ts
