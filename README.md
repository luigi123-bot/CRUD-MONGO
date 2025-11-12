# 📦 CRUD de Productos con MongoDB

Sistema completo de gestión de productos (CRUD) utilizando Node.js, Express, MongoDB y frontend vanilla JavaScript.

## 🚀 Características

- ✅ Crear productos
- 📖 Listar todos los productos
- ✏️ Editar productos existentes
- 🗑️ Eliminar productos
- 💾 Almacenamiento persistente en MongoDB
- 🎨 Interfaz moderna y responsive
- ⚡ API RESTful

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- MongoDB instalado y corriendo localmente
- npm o yarn

## 🛠️ Instalación

### 1. Instalar MongoDB (si no lo tienes)

**Windows:**
- Descarga MongoDB Community desde: https://www.mongodb.com/try/download/community
- Instala y ejecuta MongoDB como servicio

**Verificar que MongoDB está corriendo:**
```powershell
mongo --version
```

### 2. Instalar dependencias del backend

```powershell
cd backend
npm install
```

### 3. Configurar variables de entorno

El archivo `.env` ya está configurado con valores por defecto:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/productos_db
```

Puedes modificarlo si necesitas cambiar el puerto o la URI de MongoDB.

## 🎯 Uso

### 1. Iniciar MongoDB

Si MongoDB no está corriendo como servicio, inícialo manualmente:

```powershell
mongod
```

### 2. Iniciar el servidor backend

En la carpeta `backend`:

```powershell
npm start
```

O para desarrollo con auto-reinicio:

```powershell
npm run dev
```

El servidor estará corriendo en: http://localhost:3000

### 3. Abrir el frontend

Abre el archivo `index.html` en tu navegador, o usa un servidor local como Live Server de VS Code.

## 📡 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/productos` | Obtener todos los productos |
| GET | `/api/productos/:id` | Obtener un producto por ID |
| POST | `/api/productos` | Crear un nuevo producto |
| PUT | `/api/productos/:id` | Actualizar un producto |
| DELETE | `/api/productos/:id` | Eliminar un producto |

### Ejemplo de cuerpo de petición (POST/PUT):

```json
{
  "nombre": "Laptop HP",
  "descripcion": "Laptop HP 15.6 pulgadas, 8GB RAM",
  "precio": 599.99,
  "stock": 10,
  "categoria": "Electrónica"
}
```

## 📁 Estructura del Proyecto

```
Crud/
├── backend/
│   ├── models/
│   │   └── Producto.js       # Schema de Mongoose
│   ├── routes/
│   │   └── productos.js      # Rutas CRUD
│   ├── .env                  # Variables de entorno
│   ├── package.json          # Dependencias
│   └── server.js             # Servidor Express
├── index.html                # Frontend
├── style.css                 # Estilos
├── app.js                    # Lógica del frontend
└── README.md                 # Este archivo
```

## 🔧 Tecnologías Utilizadas

### Backend:
- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **CORS** - Manejo de peticiones cross-origin
- **dotenv** - Variables de entorno

### Frontend:
- **HTML5** - Estructura
- **CSS3** - Estilos y animaciones
- **JavaScript (Vanilla)** - Lógica del cliente
- **Fetch API** - Peticiones HTTP

## 🎨 Características de la Interfaz

- Diseño moderno con gradientes
- Animaciones suaves
- Tarjetas de productos con información detallada
- Formulario de creación/edición
- Responsive design
- Feedback visual (mensajes de éxito/error)

## 🐛 Solución de Problemas

### MongoDB no se conecta:
1. Verifica que MongoDB esté corriendo: `mongod --version`
2. Verifica la URI en el archivo `.env`
3. Asegúrate de que el puerto 27017 esté disponible

### El frontend no se conecta al backend:
1. Verifica que el servidor backend esté corriendo
2. Revisa que la URL en `app.js` sea correcta: `http://localhost:3000/api/productos`
3. Verifica que CORS esté habilitado en el servidor

### Error "Cannot find module":
```powershell
cd backend
npm install
```

## 📝 Modelo de Datos

```javascript
{
  nombre: String (requerido),
  descripcion: String (requerido),
  precio: Number (requerido, >= 0),
  stock: Number (requerido, >= 0),
  categoria: String (default: "General"),
  createdAt: Date (automático),
  updatedAt: Date (automático)
}
```

## 👨‍💻 Desarrollo

Para ejecutar en modo desarrollo con auto-reinicio:

```powershell
cd backend
npm run dev
```

## 📄 Licencia

ISC

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request.

---

¡Disfruta gestionando tus productos! 🎉
