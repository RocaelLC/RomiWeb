# Guía Rápida: Probar Sitios Legacy Localmente

Esta es una guía rápida para probar los sitios legacy estáticos localmente sin necesidad de deploy en Vercel.

## Inicio Rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Verificar que los archivos estén correctos
npm run verify-legacy

# 3. Iniciar el servidor de desarrollo
npm run dev

# 4. En otra terminal, probar los redirects y rutas
npm run test-legacy
```

## Pruebas Paso a Paso

### 1. Verificar Archivos (Sin Servidor)

Primero, verifica que todos los recursos existan y las rutas estén correctas:

```bash
npm run verify-legacy
```

Deberías ver:
```
✅ No se encontraron problemas. Todos los recursos referenciados existen y las rutas están correctas.
```

### 2. Iniciar Servidor de Desarrollo

En una terminal, inicia el servidor:

```bash
npm run dev
```

Deberías ver:
```
  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
```

### 3. Probar Automáticamente

En **otra terminal** (con el servidor corriendo), ejecuta:

```bash
npm run test-legacy
```

Este script probará:
- ✅ Redirects sin slash → con slash
- ✅ Rutas con slash responden 200
- ✅ Recursos se cargan

### 4. Probar Manualmente en el Navegador

1. Abre tu navegador
2. Navega a cada ruta sin slash:
   - `http://localhost:3000/Edu`
   - `http://localhost:3000/efysia`
   - `http://localhost:3000/NutriSnap`
   - `http://localhost:3000/OncoPro`
   - `http://localhost:3000/RejuvIA`
   - `http://localhost:3000/ROMIMED`

3. Cada una debería **redirigir automáticamente** a la versión con slash

4. Verifica que la página cargue correctamente:
   - No debería haber errores 404 en la consola
   - Las imágenes y recursos deberían cargar
   - El contenido debería verse correctamente

### 5. Verificar Redirects en DevTools

Para ver el redirect en acción:

1. Abre DevTools (F12)
2. Ve a la pestaña **Network**
3. Marca **"Preserve log"** (preservar log)
4. Navega a `http://localhost:3000/Edu`
5. Deberías ver en Network:
   - Primera petición: `/Edu` → Status **301** o **308** (Redirect)
   - Segunda petición: `/Edu/` → Status **200** (OK)

## Comandos Útiles

```bash
# Verificar archivos (sin servidor)
npm run verify-legacy

# Probar redirects y rutas (requiere servidor corriendo)
npm run test-legacy

# Iniciar servidor de desarrollo
npm run dev

# Iniciar servidor de producción (después de build)
npm run build
npm start
```

## Problemas Comunes

### El servidor no inicia

```bash
# Verifica que el puerto 3000 no esté en uso
lsof -ti:3000 | xargs kill -9  # macOS/Linux

# O usa otro puerto
PORT=3001 npm run dev
```

Luego actualiza la URL en las pruebas:
```bash
TEST_URL=http://localhost:3001 npm run test-legacy
```

### Los redirects no funcionan

1. Asegúrate de haber reiniciado el servidor después de modificar `next.config.mjs`:
   ```bash
   # Detén el servidor (Ctrl+C) y reinicia
   npm run dev
   ```

2. Verifica que `next.config.mjs` tenga la sintaxis correcta (sin errores de linting)

3. Verifica que el archivo se guardó correctamente

### Los recursos no cargan (404)

1. Verifica que los archivos existan en las rutas correctas:
   ```bash
   ls -la public/Edu/
   ls -la public/efysia/
   ```

2. Verifica que las rutas en el HTML sean relativas (no absolutas):
   ```bash
   # Buscar rutas absolutas problemáticas
   grep -r 'href="/\|src="/' public/Edu/ public/efysia/
   ```

3. Ejecuta el script de verificación:
   ```bash
   npm run verify-legacy
   ```

### El script de prueba falla

Si `npm run test-legacy` falla:

1. Asegúrate de que el servidor esté corriendo en `http://localhost:3000`
2. Verifica que tengas Node.js 18+ (necesario para `fetch` nativo)
3. Si usas Node.js < 18, instala `node-fetch`:
   ```bash
   npm install --save-dev node-fetch@2
   ```

## Qué Esperar

### ✅ Todo Funciona Correctamente

```
✅ Todas las pruebas pasaron correctamente!

💡 Para verificar en el navegador:
   - http://localhost:3000/Edu (debe redirigir a /Edu/)
   - http://localhost:3000/efysia (debe redirigir a /efysia/)
   ...
```

### ❌ Problemas Detectados

Si hay problemas, el script te dirá:
- Qué ruta falló
- Qué status code recibió (esperado vs actual)
- Sugerencias de qué verificar

## Siguiente Paso: Deploy

Una vez que todo funcione localmente, los cambios funcionarán igual en Vercel:

1. Los redirects en `next.config.mjs` funcionan en producción
2. Las rutas relativas funcionan igual en producción
3. Los recursos se sirven desde `public/` en producción

El propietario del proyecto solo necesita:
- Hacer commit de los cambios
- Hacer push a la rama principal
- Vercel desplegará automáticamente

## Más Información

Para más detalles, consulta la [documentación completa](./docs/legacy-static.md).


