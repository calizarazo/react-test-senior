# Recetas del Mundo - Single Page Application

Una aplicación web moderna desarrollada con Next.js, React, TypeScript y Material UI que permite explorar recetas de cocina de diferentes partes del mundo.

## 🚀 Características

- **Tabla interactiva de recetas**: Visualiza recetas con información detallada (nombre, cocina, tiempos, raciones, dificultad)
- **Filtrado por dificultad**: Filtra recetas por nivel de dificultad (Fácil, Medio, Difícil) mediante un menú lateral
- **Paginación**: Navega fácilmente entre las recetas con paginación integrada
- **Página de detalle**: Visualiza información completa de cada receta (ingredientes, instrucciones, valoraciones)
- **Diseño responsive**: Adaptado para diferentes tamaños de pantalla (móvil, tablet, desktop)
- **Manejo de errores**: Gestión adecuada de errores en las peticiones a la API
- **Interfaz moderna**: Diseño limpio y atractivo con Material UI

## 🛠️ Tecnologías Utilizadas

- **Next.js 14**: Framework de React para producción
- **React 18**: Biblioteca de JavaScript para construir interfaces de usuario
- **TypeScript**: Superset de JavaScript con tipado estático
- **Material UI (MUI)**: Biblioteca de componentes de React
- **Axios**: Cliente HTTP para realizar peticiones a la API
- **Redux Toolkit**: Librería de gestión de estado predecible y escalable
- **React Redux**: Bindings oficiales de React para Redux
- **Emotion**: Librería de CSS-in-JS utilizada por Material UI

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** o **yarn** o **pnpm**

## 🔧 Instalación

1. **Clona el repositorio** (o navega al directorio del proyecto):
   ```bash
   cd pruebatecnica
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```
   o
   ```bash
   yarn install
   ```
   o
   ```bash
   pnpm install
   ```

## 🏃 Ejecución

### Modo de desarrollo

Para ejecutar la aplicación en modo de desarrollo:

```bash
npm run dev
```

o

```bash
yarn dev
```

o

```bash
pnpm dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

### Modo de producción

Para construir la aplicación para producción:

```bash
npm run build
```

Para ejecutar la aplicación en modo de producción:

```bash
npm start
```

## 📁 Estructura del Proyecto

```
pruebatecnica/
├── app/                    # Directorio de páginas y layouts de Next.js
│   ├── layout.tsx         # Layout principal de la aplicación
│   ├── page.tsx           # Página principal (lista de recetas)
│   ├── globals.css        # Estilos globales
│   └── recipe/
│       └── [id]/
│           └── page.tsx   # Página de detalle de receta
├── components/            # Componentes reutilizables
│   ├── Navbar.tsx        # Barra de navegación superior
│   ├── Sidebar.tsx       # Menú lateral de filtros
│   ├── Footer.tsx        # Pie de página
│   └── RecipeTable.tsx   # Tabla de recetas
├── services/             # Servicios de API
│   └── api.ts           # Cliente Axios y funciones de API
├── store/               # Gestión de estado
│   ├── recipeStore.ts   # Slice de Redux para recetas
│   ├── store.ts         # Configuración del store de Redux
│   └── hooks.ts         # Hooks tipados para Redux
├── types/               # Definiciones de tipos TypeScript
│   └── recipe.ts        # Tipos relacionados con recetas
├── theme/               # Configuración de tema
│   └── theme.ts         # Tema de Material UI
├── package.json         # Dependencias y scripts
├── tsconfig.json        # Configuración de TypeScript
├── next.config.js       # Configuración de Next.js
└── README.md           # Este archivo
```

## 🎨 Componentes Principales

### Navbar
Barra de navegación superior que incluye:
- Título de la aplicación con ícono
- Barra de búsqueda (no funcional)
- Botón de inicio de sesión (no funcional)

### Sidebar
Menú lateral que permite filtrar recetas por:
- Todas las recetas
- Fácil (Easy)
- Medio (Medium)
- Difícil (Hard)

### RecipeTable
Tabla interactiva que muestra:
- Nombre de la receta
- Cocina (cuisine)
- Tiempo de preparación
- Tiempo de cocción
- Número de raciones
- Dificultad

### Recipe Detail Page
Página de detalle que muestra:
- Información completa de la receta
- Lista de ingredientes
- Instrucciones paso a paso
- Valoración y reseñas
- Etiquetas

## 🔌 API

La aplicación utiliza la API pública de DummyJSON Recipes:
- **Documentación**: [https://dummyjson.com/docs/recipes](https://dummyjson.com/docs/recipes)
- **Endpoint base**: [https://dummyjson.com/recipes](https://dummyjson.com/recipes)

### Endpoints utilizados:
- `GET /recipes` - Obtener todas las recetas
- `GET /recipes/:id` - Obtener una receta por ID
- `GET /recipes?difficulty={difficulty}` - Filtrar recetas por dificultad

## 🎯 Funcionalidades Implementadas

✅ Navbar con título, ícono, búsqueda y botón de login  
✅ Sidebar con filtro de dificultad dinámico  
✅ Footer con nombre del desarrollador y año actual  
✅ Tabla de recetas con todas las columnas requeridas  
✅ Paginación en la tabla de recetas  
✅ Página de detalle de receta con ingredientes, instrucciones y valoraciones  
✅ Navegación entre páginas  
✅ Uso de Axios para peticiones HTTP  
✅ Manejo de errores en las peticiones  
✅ Gestión de estado con Redux Toolkit  
✅ Diseño responsive con Material UI  
✅ Interfaz visualmente atractiva y fácil de navegar  

## 🐛 Solución de Problemas

### Error de conexión a la API
Si experimentas problemas de conexión, verifica:
- Tu conexión a Internet
- Que la API de DummyJSON esté disponible
- Los logs de la consola del navegador para más detalles

### Problemas de compilación
Si encuentras errores de TypeScript:
```bash
npm run build
```
Revisa los mensajes de error y corrige los problemas de tipado.

## 📝 Notas

- La barra de búsqueda y el botón de inicio de sesión son elementos visuales y no tienen funcionalidad implementada, como se especificó en los requisitos.
- El filtrado por dificultad se realiza dinámicamente sin recargar la página.
- La aplicación es completamente responsive y se adapta a diferentes tamaños de pantalla.

## 👨‍💻 Desarrollador

Desarrollado por camilazo - 2026

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

