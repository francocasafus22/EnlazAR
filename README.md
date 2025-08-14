<h1 align="center"> 🔗 EnlazAR 🔗 </h1>



<p align="left">
<img src="https://img.shields.io/badge/STATUS-TERMINADO-green">
</p>

## 📋 Índice
- [Descripción](#descripcion)
- [Capturas](#capturas)
- [Funcionalidades](#funcionalidades)
- [Instalación](#instalacion)
- [Tecnologías](#tecnologias)
- [Contacto](#contacto)

<h2 id="descripcion">📖 Descripción</h2>

**EnlazAR** es una plataforma que permite a los usuarios centralizar todos sus enlaces importantes en un solo lugar, creando una página personal personalizable que puede compartirse fácilmente en redes sociales.
Ideal para influencers, creadores de contenido, profesionales y cualquier persona que quiera organizar sus perfiles, redes, portafolios y enlaces importantes de manera elegante y accesible.

<h2 id="capturas">📸 Capturas</h2>

<p align="center">
  <img src="https://github.com/user-attachments/assets/c24a77df-6bde-4dd2-92c0-37940fa1576d" width="500"/>
  <img src="https://github.com/user-attachments/assets/6d2972eb-bad3-4fd7-9c8b-512b3bc0c562" width="500"/>
</p>

<h2 id="funcionalidades">:hammer: Funcionalidades</h2>

- 🌳 Página unica para cada usuario con todos sus enlaces a redes sociales. 
- ✅ Personalización visual de tu perfil.
- 🔗 Búsqueda de handle disponibles. 
- 🔑 Registro y login seguro con JWT y hasheo de contraseñas con bcrypt.
- 🎨 Interfaz intuitiva y responsiva
- 👤 Perfil de usuario: editar nombre, foto, bio y configuración de enlaces.
- 🔒 Privacidad y permisos: elegir qué enlaces son públicos o privados, y elegir el orden de cada uno.
- ✅ Validaciónes y autorización para cada formulario y página.

<h2 id="instalacion">⚙️ Instalación</h2>

🔹 Backend
```bash
# 1️⃣ Clona el repositorio
git clone https://github.com/francocasafus22/EnlazAR.git

# 2️⃣ Accede al directorio del Backend
cd backend

# 3️⃣ Instala dependencias
npm install

# 4️⃣ Configura variables de entorno
# Crea un archivo .env en la raíz del backend con estas variables:
# PORT=3000
# FRONTEND_URL="http://localhost:5173"  # URL del frontend Vite
# JWT_SECRET="tu_firma_secreta"
# MONGO_URI="cadena_de_conexión de MongoDB Atlas"
# CLOUDINARY_NAME="tu_nombre_cloudinary"
# CLOUDINARY_API_KEY="tu_api_key"
# CLOUDINARY_API_SECRET="tu_api_secret"

# 5️⃣ Ejecuta en modo desarrollo
npm run dev

```
🔹 Frontend

```bash
# 1️⃣ Accede al directorio del Frontend
cd frontend

# 2️⃣ Instala dependencias
npm install

# 3️⃣ Configura variables de entorno
# Crea un archivo .env en la raíz del frontend con variables públicas:
VITE_API_URL = http://localhost:3000

# 4️⃣ Ejecuta en modo desarrollo
npm run dev

```
<h2 id="tecnologias">🛠 Tecnologías</h2>

### 🔹 Backend
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) **Node.js**  
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) **TypeScript**  
- ![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white) **Express.js**  
- ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white) **MongoDB Atlas**  
- ![Cloudinary](https://img.shields.io/badge/Cloudinary-0000FF?style=for-the-badge&logo=cloudinary&logoColor=white) **Cloudinary**  

### 🔹 Frontend
- ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) **React**  
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) **Vite**  
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white) **Tailwind CSS**  
- ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white) **Axios**


<h2 id="contacto">📬 Contacto</h2>

<p align="center">
  <a href="https://github.com/francocasafus22">
    <img src="https://img.shields.io/badge/GitHub-francocasafus22-181717?style=for-the-badge&logo=github" alt="GitHub"/>
  </a>
  <a href="https://www.linkedin.com/in/franco-casafus-17ba47230/">
    <img src="https://img.shields.io/badge/LinkedIn-FrancoCasafus-0077B5?style=for-the-badge&logo=linkedin" alt="LinkedIn"/>
  </a>
  <a href="mailto:francocasafus55@gmail.com">
    <img src="https://img.shields.io/badge/Email-francocasafus55@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"/>
  </a>
</p>
