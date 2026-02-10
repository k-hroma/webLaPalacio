# La Palacio - Librería Online

Aplicación full-stack de e-commerce para una librería. Desarrollada con stack moderno 
y buenas prácticas de seguridad y validación.

## 🚀 Demo

[Link al deploy]

## ✨ Funcionalidades principales

- **Catálogo de libros**: navegación por categorías, búsqueda y filtros
- **Carrito de compras**: gestión de items, persistencia en sesión
- **Autenticación de usuarios**: registro, login y rutas protegidas con JWT
- **Panel de administración**: gestión de productos (CRUD completo)
- **Validaciones robustas**: esquemas con Zod para datos consistentes

## 🛠️ Stack tecnológico

| Frontend | Backend | Base de datos | Herramientas |
|----------|---------|---------------|--------------|
| React + Vite | Node.js + Express | MongoDB | TypeScript |
| React Router | JWT (auth) | Mongoose | Zod (validación) |

## 📁 Estructura del proyecto

/webLaPalacio
├── /frontend          # React + Vite
│   ├── /src
│   │   ├── /assets
│   │   ├── /components
│   │   ├── /context   # Auth context
│   │   ├── /layout
│   │   ├── /routers
│   │   └── /services  # API calls
│   │   ├── /styles
│   │   ├── /utils
│   │   ├── /views
│   └── ...
├── /backend           # Node + Express
│   ├── /src
│   │   ├── /config    # MongoDB
│   │   ├── /controllers
│   │   ├── /middlewares  # Auth + validaciones
│   │   ├── /models    # Mongoose schemas
│   │   ├── /routes
│   │   ├── /schemas   # Zod schemas
│   │   └── /types     
│   └── ...
└── README.md




Desarrolladora full-stack junior | Diplomada UTN Buenos Aires |
Tecnicatura en Programación (1° año)
📫 rociomendonca@gmail.com | 💼 www.linkedin.com/in/rocio-mendonca
