# PreentregaReactDelpretti

Proyecto React (Vite) — Preentrega final. Esta rama con las novedades está en `feature/final-delivery`.

Contenido principal
- Carrito con Context API (`src/context/CartContext.jsx`)
- Autenticación simple con `AuthContext` (`src/context/AuthContext.jsx`) y rutas protegidas
- CRUD local de productos con `json-server` (archivo `db.json`) y un panel admin (`/admin`)
- Búsqueda y paginación en catálogo (`src/components/ProductsList.jsx`)
- Integración básica con `react-toastify` para notificaciones y `react-helmet` para SEO

----

Requisitos locales

- Node.js (recomendado v18.x por engines; versiones recientes funcionan también)
- npm o yarn

Instalación

Abre PowerShell en la carpeta del proyecto y ejecuta:

```powershell
npm install
```

Desarrollo local

1) Levantar la mock API (json-server) en el puerto 4000:

```powershell
npm run serve:api
```

Esto expone `http://localhost:4000/products` con los productos iniciales (ver `db.json`).

2) En otra terminal, levantar la app React:

```powershell
npm run dev
```

3) Abrir en el navegador: normalmente `http://localhost:5173`.

Rutas útiles
- `/` - Home
- `/products` - Catálogo (con búsqueda y paginación)
- `/producto/:id` - Detalle de producto
- `/login` - Login (usuario demo)
- `/admin` - Panel administrativo (protegido)

Credenciales de prueba

- Usuario: `admin`
- Contraseña: `1234`

Admin

La ruta `/admin` permite crear, editar y eliminar productos. La eliminación usa un modal de confirmación.

API y producción

En desarrollo la app usa `http://localhost:4000` si no configuras variables. En producción debes configurar la variable de entorno Vite:

- `VITE_API_URL` — URL base del API (ej.: `https://mi-mockapi.mockapi.io`)

Si vas a desplegar en Vercel, añade `VITE_API_URL` en las Environment Variables del proyecto en Vercel.

Notas sobre deployment en Vercel

1. Conecta el repositorio a Vercel y selecciona la rama que quieras desplegar (recomendado: `feature/final-delivery` para revisar cambios antes de mezclar a `main`).
2. Build command: `npm run build`
3. Output directory: `dist`
4. Añade la variable de entorno `VITE_API_URL` (Preview & Production) apuntando a un backend público (por ejemplo mockapi.io o tu backend desplegado). Si no pones esta variable, la app intentará `http://localhost:4000` y no podrá obtener datos en producción.

Alternativas para API en producción
- Usar https://mockapi.io/ — crea una collection `products` y copia la base URL (por ejemplo `https://63xxxx.mockapi.io`) en `VITE_API_URL`.
- Desplegar un servidor (Heroku/Render/Railway) que sirva tu `db.json` con json-server (no recomendado para producción real, mejor crear un backend mínimo).

Build local (verificación antes de deploy)

```powershell
npm run build
```

Esto genera la carpeta `dist` lista para producción.

Puntos pendientes / recomendaciones
- Añadir roles en `AuthContext` si necesitas control más fino de permisos.
- Integrar una API real para producción (en lugar de json-server).
- Añadir tests automatizados (unit / integration) antes de merge final.

Branch de trabajo
- Cambios de la entrega final están en la rama: `feature/final-delivery`.

Contacto

Si quieres, puedo:
- Generar los pasos para crear la colección en mockapi.io y ayudarte a configurar `VITE_API_URL` en Vercel.
- Añadir `vercel.json` con redirects/headers si lo necesitas.

---
Archivo generado automáticamente por el flujo de entrega. Si quieres que incluya capturas, badges o instrucciones extra (CI, tests), dime cuáles.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
