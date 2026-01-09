# Sitios Legacy Estáticos

Esta documentación describe cómo funcionan los sitios estáticos legacy alojados en `public/` y cómo agregar nuevos sitios.

## Sitios Actuales

Los siguientes sitios legacy están disponibles en producción:

- `/Edu/` - ROMI® Educación
- `/efysia/` - EFYSIA Biotintes
- `/NutriSnap/` - NutriSnap Demo
- `/OncoPro/` - OncoPro Suite Oncológica
- `/RejuvIA/` - Rejuv-IA Glow + Skin Lab
- `/ROMIMED/` - ROMI MED MVP 2026

## Cómo Funcionan

Next.js sirve automáticamente archivos desde `public/` bajo la ruta raíz. Por ejemplo:
- `public/Edu/index.html` → disponible en `/Edu/index.html`
- `public/efysia/Efysia.jpg` → disponible en `/efysia/Efysia.jpg`

### Redirects Automáticos

Se configuraron redirects permanentes (301) en `next.config.mjs` para que las rutas sin slash final redirijan a la versión con slash:

- `/Edu` → `/Edu/` (redirige a index.html)
- `/efysia` → `/efysia/`
- `/NutriSnap` → `/NutriSnap/`
- `/OncoPro` → `/OncoPro/`
- `/RejuvIA` → `/RejuvIA/`
- `/ROMIMED` → `/ROMIMED/`

## Agregar un Nuevo Sitio Legacy

### 1. Crear la Estructura de Carpetas

```bash
mkdir -p public/MiNuevoSitio
```

### 2. Agregar Archivos

Coloca tus archivos HTML, CSS, JS e imágenes dentro de `public/MiNuevoSitio/`:

```
public/
  MiNuevoSitio/
    index.html
    styles.css
    script.js
    images/
      logo.png
      hero.jpg
```

### 3. Usar Rutas Relativas

**CRÍTICO:** Todos los recursos locales deben usar rutas relativas para que funcionen correctamente desde subcarpetas.

#### ✅ Correcto (Rutas Relativas)

```html
<!-- Desde index.html en MiNuevoSitio/ -->
<link rel="stylesheet" href="./styles.css">
<img src="./images/logo.png" alt="Logo">
<script src="./script.js"></script>

<!-- O sin el ./ -->
<link rel="stylesheet" href="styles.css">
<img src="images/logo.png" alt="Logo">
```

```css
/* En styles.css dentro de MiNuevoSitio/ */
.hero {
  background-image: url('./images/hero.jpg');
  /* O */
  background-image: url('images/hero.jpg');
}
```

#### ❌ Incorrecto (Rutas Absolutas)

```html
<!-- NO usar rutas absolutas para recursos locales -->
<link rel="stylesheet" href="/styles.css">
<img src="/images/logo.png" alt="Logo">

<!-- Estas rutas buscarán en la raíz del sitio, no en la subcarpeta -->
```

### 4. Agregar Redirect en next.config.mjs

Edita `next.config.mjs` y agrega un nuevo redirect en el array de `redirects()`:

```javascript
async redirects() {
  return [
    // ... otros redirects existentes ...
    {
      source: '/MiNuevoSitio',
      destination: '/MiNuevoSitio/',
      permanent: true,
    },
  ];
}
```

### 5. Verificar con el Script

Ejecuta el script de verificación para asegurar que todo está correcto:

```bash
npm run verify-legacy
# O directamente:
node scripts/verify-legacy-static.mjs
```

## Checklist de Rutas Relativas

Antes de hacer deploy, verifica:

- [ ] Todos los recursos CSS usan rutas relativas (`./styles.css` o `styles.css`)
- [ ] Todas las imágenes usan rutas relativas (`./images/logo.png` o `images/logo.png`)
- [ ] Todos los scripts JS usan rutas relativas (`./script.js` o `script.js`)
- [ ] Las referencias `url()` en CSS usan rutas relativas
- [ ] Los enlaces externos (http/https) se mantienen como están
- [ ] Los anclas (`#section`) funcionan correctamente
- [ ] Se agregó el redirect en `next.config.mjs`
- [ ] El script de verificación no reporta problemas

## Cómo Agregar Redirects

### Estructura Básica

```javascript
{
  source: '/RutaSinSlash',
  destination: '/RutaSinSlash/',
  permanent: true,  // 301 Permanent Redirect
}
```

### Ejemplo Completo

```javascript
// next.config.mjs
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/MiNuevoSitio',
        destination: '/MiNuevoSitio/',
        permanent: true,
      },
      // Puedes agregar múltiples redirects
      {
        source: '/old-path',
        destination: '/MiNuevoSitio/',
        permanent: true,
      },
    ];
  },
  // ... resto de la configuración
};
```

### Importante sobre Redirects

- **`permanent: true`** → Código 301 (permanente, mejor para SEO)
- **`permanent: false`** → Código 302 (temporal)
- Los redirects se procesan **antes** que los rewrites
- Los redirects se aplican tanto en desarrollo como en producción

## Script de Verificación

El script `scripts/verify-legacy-static.mjs` valida automáticamente:

1. ✅ Que los recursos referenciados existan en el filesystem
2. ✅ Que las rutas absolutas a recursos locales se detecten
3. ✅ Que las rutas en CSS (`url()`) sean correctas
4. ✅ Que no haya recursos faltantes

### Uso

```bash
# Desde la raíz del proyecto frontend
node scripts/verify-legacy-static.mjs
```

### Agregar como Script NPM

En `package.json`:

```json
{
  "scripts": {
    "verify-legacy": "node scripts/verify-legacy-static.mjs"
  }
}
```

Luego ejecutar:

```bash
npm run verify-legacy
```

## Pruebas Locales

### 1. Iniciar el Servidor de Desarrollo

```bash
npm install
npm run dev
```

### 2. Verificar Rutas

Usa `curl` o tu navegador para verificar que cada ruta responde correctamente:

```bash
# Verificar redirects (debe retornar 301)
curl -I http://localhost:3000/Edu
curl -I http://localhost:3000/efysia

# Verificar que las rutas con slash funcionan (debe retornar 200)
curl -I http://localhost:3000/Edu/
curl -I http://localhost:3000/efysia/

# Verificar que los recursos se cargan correctamente
curl -I http://localhost:3000/efysia/Efysia.jpg
```

### 3. Verificar en el Navegador

1. Abre `http://localhost:3000/Edu/`
2. Abre las DevTools (F12)
3. Ve a la pestaña Network
4. Verifica que no haya errores 404 para recursos CSS, JS o imágenes
5. Repite para todos los sitios legacy

## Assets Globales vs. Locales

### Assets Globales

Los assets en `public/images/`, `public/file.svg`, etc. son compartidos por toda la aplicación Next.js y deben referenciarse con rutas absolutas desde la raíz:

```html
<!-- Desde cualquier sitio legacy -->
<img src="/images/iconoROMI.png" alt="Logo ROMI">
```

### Assets Locales del Sitio

Los assets dentro de cada carpeta legacy deben usar rutas relativas:

```html
<!-- Desde efysia/index.html -->
<img src="Efysia.jpg" alt="Logo">
<!-- NO: <img src="/efysia/Efysia.jpg"> -->
```

## Troubleshooting

### Problema: Los recursos no se cargan (404)

**Causa:** Probablemente se están usando rutas absolutas.

**Solución:** Cambiar a rutas relativas. Ejemplo:
- ❌ `href="/css/styles.css"`
- ✅ `href="./css/styles.css"` o `href="css/styles.css"`

### Problema: El redirect no funciona

**Causa:** El servidor de desarrollo puede necesitar reiniciarse.

**Solución:**
1. Detén el servidor (Ctrl+C)
2. Reinicia con `npm run dev`
3. Verifica que `next.config.mjs` tenga la sintaxis correcta

### Problema: Las rutas relativas no funcionan en producción

**Causa:** Puede haber un problema con la base URL.

**Solución:** Asegúrate de que las rutas relativas sean realmente relativas (sin `/` al inicio) y que el archivo esté en la misma carpeta o subcarpeta relativa.

## Notas Importantes

- ⚠️ **No modifiques** assets globales (`public/images/`, etc.) a menos que sea necesario para los sitios legacy y esté documentado
- ✅ **Respeta** las mayúsculas/minúsculas en las rutas (especialmente importante en sistemas case-sensitive)
- ✅ **Mantén** el estilo de código consistente con el repositorio
- ✅ **No introduzcas** dependencias pesadas innecesarias
- ✅ **No rompas** el enrutado actual de la app en `src/app`

## Ejemplos de Estructura Correcta

```
public/
├── Edu/
│   └── index.html          → /Edu/
├── efysia/
│   ├── index.html          → /efysia/
│   └── Efysia.jpg          → /efysia/Efysia.jpg
├── NutriSnap/
│   └── index.html          → /NutriSnap/
├── images/                 → /images/ (global)
│   └── iconoROMI.png       → /images/iconoROMI.png
└── file.svg                → /file.svg (global)
```

## Referencias

- [Next.js Static File Serving](https://nextjs.org/docs/app/building-your-application/optimizing/static-assets)
- [Next.js Redirects](https://nextjs.org/docs/app/api-reference/next-config-js/redirects)

