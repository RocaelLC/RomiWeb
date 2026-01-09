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

### Método 1: Script Automático (Recomendado)

El script `test-legacy-local.mjs` prueba automáticamente todos los redirects y rutas:

```bash
# 1. Instalar dependencias (si no están instaladas)
npm install

# 2. Iniciar el servidor de desarrollo (en una terminal)
npm run dev

# 3. En otra terminal, ejecutar las pruebas
npm run test-legacy
```

El script verificará:
- ✅ Redirects sin slash → con slash (301)
- ✅ Rutas con slash responden 200
- ✅ Recursos se cargan correctamente

### Método 2: Verificación Manual con curl

Si prefieres probar manualmente:

```bash
# 1. Iniciar el servidor de desarrollo
npm run dev

# 2. En otra terminal, verificar redirects (debe retornar 301)
curl -I http://localhost:3000/Edu
curl -I http://localhost:3000/efysia
curl -I http://localhost:3000/NutriSnap
curl -I http://localhost:3000/OncoPro
curl -I http://localhost:3000/RejuvIA
curl -I http://localhost:3000/ROMIMED

# 3. Verificar que las rutas con slash funcionan (debe retornar 200)
curl -I http://localhost:3000/Edu/
curl -I http://localhost:3000/efysia/
curl -I http://localhost:3000/NutriSnap/
curl -I http://localhost:3000/OncoPro/
curl -I http://localhost:3000/RejuvIA/
curl -I http://localhost:3000/ROMIMED/

# 4. Verificar que los recursos se cargan correctamente
curl -I http://localhost:3000/efysia/Efysia.jpg
```

### Método 3: Verificación en el Navegador

1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Abre tu navegador y prueba cada sitio:
   - `http://localhost:3000/Edu` → debe redirigir a `/Edu/`
   - `http://localhost:3000/efysia` → debe redirigir a `/efysia/`
   - etc.

3. Abre las DevTools (F12) en cada sitio:
   - Ve a la pestaña **Network**
   - Verifica que no haya errores 404 para recursos CSS, JS o imágenes
   - Verifica que el redirect funcione (puedes verlo en la pestaña Network)

4. Prueba las rutas con slash directamente:
   - `http://localhost:3000/Edu/`
   - `http://localhost:3000/efysia/`
   - etc.

### Verificación de Redirects en el Navegador

Para verificar que los redirects funcionan correctamente:

1. Abre las DevTools (F12)
2. Ve a la pestaña **Network**
3. Marca la opción "Preserve log" (para ver redirects)
4. Navega a una ruta sin slash, por ejemplo: `http://localhost:3000/Edu`
5. Deberías ver:
   - Primera petición a `/Edu` con status **301** o **308** (redirect)
   - Segunda petición a `/Edu/` con status **200** (OK)

### Nota Importante sobre Fetch/API

El script de prueba usa `fetch`, que en Node.js puede seguir redirects automáticamente. Si ves status 200 en lugar de 301, es normal - significa que el redirect funcionó y fetch lo siguió automáticamente. Para ver el redirect real, usa `curl -I` o el navegador con DevTools.

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

