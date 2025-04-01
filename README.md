
# 🐾 Guardería de Mascotas y Adopciones  

Esta aplicación permite gestionar una guardería de mascotas, facilitando la reserva de turnos y la publicación de animales en adopción.  

## 🚀 Tecnologías Utilizadas  

### 📌 Backend  
- **Node.js** con **Express** y **Mongoose**  
- **MongoDB** como base de datos  
- **Supabase** para almacenamiento de imágenes  
- **JSON Web Token (JWT)** para autenticación  
- **CORS (Cross-Origin Resource Sharing)** para manejo de permisos  

### 🎨 Frontend  
- **Handlebars** para plantillas  
- **Bootstrap** para estilos  

### 📅 Integración con Calendario  
- **Cronofy API** para gestión de reservas  

---

## ⚙️ Configuración del Entorno  

1. **Clonar el repositorio:**  
   ```bash
   git clone https://github.com/tuusuario/guarderia-mascotas.git
   cd guarderia-mascotas
## 🏗 Instalación y Ejecución

### Opción 1: Usando Docker
1. Construye la imagen Docker:
   ```sh
   docker-compose build
   ```
2. Ejecuta el contenedor:
   ```sh
   docker-compose up
   ```
3. Accede a la aplicación en: [http://localhost:8000/api/login/principal](http://localhost:8000/api/login/principal)

### Opción 2: Instalación Manual
1. Instala las dependencias:
   ```sh
   npm install
   ```
2. Inicia el servidor:
   ```sh
   npm start
   ```

## 🛠 Configuración de la Base de Datos
Es necesario conectar la base de datos y crear un usuario administrador manualmente. En la carpeta `models`, encontrarás la plantilla de usuario. Asegúrate de que el campo `tipo` sea `admin`. Los usuarios registrados desde la página serán creados como usuarios comunes.

## 📸 Capturas de Pantalla


## 📌 Notas Adicionales
- Se recomienda utilizar **Node.js v18+** para mejor compatibilidad.
- La persistencia de datos se realiza en MongoDB.
- Para pruebas locales, puedes utilizar herramientas como **Postman** o **Insomnia** para consumir la API.

---
### 📬 Contacto
Si tienes preguntas o sugerencias, no dudes en contactarme (bobadillaf97@gmail.com). 🚀

