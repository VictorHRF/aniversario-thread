# Nuestro Hilo

SPA hecha con React + Vite + Tailwind CSS + Motion como regalo de aniversario.

## Requisitos

- Node.js 18 o superior
- npm

## Desarrollo local

```bash
npm install
npm run dev
```

## Build local

```bash
npm run build
npm run preview
```

## Subir a GitHub

Este proyecto ya tiene `.gitignore` para evitar subir `node_modules`, `dist`, `.vercel`, `.DS_Store` y archivos `.env`.

### Opción 1: con GitHub CLI

```bash
git add .
git commit -m "Initial commit"
gh repo create nuestro-hilo-scrapbook --source=. --private --push
```

### Opción 2: manual

1. Crea un repositorio nuevo en GitHub sin `README`, sin `.gitignore` y sin licencia.
2. Luego corre:

```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

## Desplegar en Vercel

La configuración del proyecto ya quedó en `vercel.json`:

- `framework: "vite"`
- `buildCommand: "npm run build"`
- `outputDirectory: "dist"`
- rewrite SPA a `index.html` para que rutas internas no den `404`

### Opción 1: desde GitHub

1. Entra a Vercel.
2. Elige **Add New Project**.
3. Importa el repositorio de GitHub.
4. Vercel debería detectar Vite automáticamente.
5. Deploy.

### Opción 2: con Vercel CLI

```bash
npm i -g vercel
vercel
```

Para publicar a producción:

```bash
vercel --prod
```

## Notas

- Si más adelante agregas variables de entorno para una API o contenido privado, colócalas en Vercel Project Settings > Environment Variables.
- Si agregas rutas del lado del cliente, la regla de `rewrites` en `vercel.json` ya deja preparada la SPA para resolverlas correctamente.
