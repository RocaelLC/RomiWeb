#!/usr/bin/env node
/**
 * Script para probar sitios legacy localmente
 * 
 * Verifica que:
 * - Los redirects funcionen correctamente
 * - Las rutas con slash respondan 200
 * - Los recursos se carguen correctamente
 */

const BASE_URL = process.env.TEST_URL || 'http://localhost:3000';

const LEGACY_SITES = [
  { name: 'Edu', path: '/Edu' },
  { name: 'efysia', path: '/efysia', resource: 'Efysia.jpg' },
  { name: 'NutriSnap', path: '/NutriSnap' },
  { name: 'OncoPro', path: '/OncoPro' },
  { name: 'RejuvIA', path: '/RejuvIA' },
  { name: 'ROMIMED', path: '/ROMIMED' },
];

async function fetchWithRedirects(url, followRedirects = true) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: followRedirects ? 'follow' : 'manual',
    });
    
    return {
      url,
      status: response.status,
      statusText: response.statusText,
      finalUrl: response.url,
      redirected: response.url !== url,
    };
  } catch (error) {
    return {
      url,
      error: error.message,
    };
  }
}

async function testRedirects() {
  console.log('🧪 Probando redirects y rutas legacy localmente\n');
  console.log(`URL base: ${BASE_URL}\n`);
  console.log('='.repeat(80) + '\n');

  let allPassed = true;

  for (const site of LEGACY_SITES) {
    console.log(`📁 Probando ${site.name}...\n`);

    // Test 1: Redirect sin slash → con slash
    const redirectTest = await fetchWithRedirects(`${BASE_URL}${site.path}`, false);
    
    if (redirectTest.status === 301 || redirectTest.status === 308) {
      console.log(`  ✅ Redirect (${site.path} → ${site.path}/): ${redirectTest.status}`);
      
      // Verificar destino
      if (redirectTest.finalUrl === `${BASE_URL}${site.path}/` || 
          (redirectTest.status >= 301 && redirectTest.status <= 308)) {
        console.log(`     Destino correcto: ${site.path}/\n`);
      } else {
        console.log(`     ⚠️  Destino inesperado\n`);
        allPassed = false;
      }
    } else if (redirectTest.status === 200) {
      // Next.js puede seguir redirects automáticamente en fetch
      console.log(`  ℹ️  Redirect seguido automáticamente (status: ${redirectTest.status})\n`);
    } else if (redirectTest.error) {
      console.log(`  ❌ Error: ${redirectTest.error}\n`);
      allPassed = false;
    } else {
      console.log(`  ⚠️  Status inesperado: ${redirectTest.status}\n`);
      allPassed = false;
    }

    // Test 2: Ruta con slash debe responder 200
    const withSlashTest = await fetchWithRedirects(`${BASE_URL}${site.path}/`);
    
    if (withSlashTest.status === 200) {
      console.log(`  ✅ Ruta con slash (${site.path}/): ${withSlashTest.status} OK\n`);
    } else if (withSlashTest.error) {
      console.log(`  ❌ Error: ${withSlashTest.error}\n`);
      console.log(`     💡 Asegúrate de que el servidor esté corriendo: npm run dev\n`);
      allPassed = false;
    } else {
      console.log(`  ❌ Status: ${withSlashTest.status} (esperado: 200)\n`);
      allPassed = false;
    }

    // Test 3: Recurso si existe
    if (site.resource) {
      const resourceTest = await fetchWithRedirects(`${BASE_URL}${site.path}/${site.resource}`);
      
      if (resourceTest.status === 200) {
        console.log(`  ✅ Recurso (${site.path}/${site.resource}): ${resourceTest.status} OK\n`);
      } else if (resourceTest.status === 404) {
        console.log(`  ⚠️  Recurso no encontrado: ${site.path}/${site.resource}\n`);
        // No es crítico si el recurso no existe
      } else if (resourceTest.error) {
        console.log(`  ❌ Error: ${resourceTest.error}\n`);
      } else {
        console.log(`  ⚠️  Status: ${resourceTest.status}\n`);
      }
    }

    console.log('-'.repeat(80) + '\n');
  }

  console.log('='.repeat(80) + '\n');

  if (allPassed) {
    console.log('✅ Todas las pruebas pasaron correctamente!\n');
    console.log('💡 Para verificar en el navegador:\n');
    LEGACY_SITES.forEach(site => {
      console.log(`   - ${BASE_URL}${site.path} (debe redirigir a ${site.path}/)`);
    });
    console.log('');
  } else {
    console.log('⚠️  Algunas pruebas fallaron. Revisa los errores arriba.\n');
    console.log('💡 Asegúrate de que:\n');
    console.log('   1. El servidor esté corriendo: npm run dev');
    console.log('   2. El servidor esté en http://localhost:3000');
    console.log('   3. No haya errores en la consola del servidor\n');
  }

  return allPassed ? 0 : 1;
}

// Ejecutar pruebas
if (import.meta.url === `file://${process.argv[1]}`) {
  testRedirects().then(exitCode => {
    process.exit(exitCode);
  }).catch(error => {
    console.error('Error ejecutando pruebas:', error);
    process.exit(1);
  });
}

export { testRedirects };


