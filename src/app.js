import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { engine } from 'express-handlebars';
import animalRoutes from './router/animal.router.js';
import usuariosModel from './router/usuarios.router.js';
import tipoAnimalesModel from './router/tipos.router.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import  loginModel from './router/login.router.js'
import authMiddleware from './middlewares/authMiddleware.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

dotenv.config();

// Configuración CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Ajusta esto
    credentials: true,
  })
);

// Configuración de directorio estático
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', '../views');
app.set('views', path.join(__dirname,  'views'));  // Asegúrate de que apunte correctamente a la carpeta 'views'
app.engine('handlebars', engine({
  runtimeOptions: {
      allowProtoPropertiesByDefault: true, // Permite acceso a propiedades heredadas
      allowProtoMethodsByDefault: true,    // Permite acceso a métodos heredados
  }
}));
// Rutas
app.use('/api/animales',authMiddleware, animalRoutes);
app.use('/api/usuarios',usuariosModel);
app.use('/api/tipos',authMiddleware, tipoAnimalesModel);
app.use('/api/login', loginModel)

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('🔥 Conectado a MongoDB'))
  .catch((err) => console.error('❌ Error al conectar a MongoDB:', err));

// Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
