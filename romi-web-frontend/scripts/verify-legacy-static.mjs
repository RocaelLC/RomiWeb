#!/usr/bin/env node
/**
 * Script de verificación para sitios legacy estáticos
 * 
 * Valida que:
 * - Las rutas absolutas a recursos locales se corrijan a relativas
 * - Los recursos referenciados existan en el filesystem
 * - No haya rutas problemáticas que rompan desde subcarpetas
 */

import { readFileSync, existsSync, statSync, readdirSync } from 'fs';
import { join, dirname, resolve, relative, basename } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');
const PUBLIC_DIR = join(ROOT, 'public');

const LEGACY_SITES = ['Edu', 'efysia', 'NutriSnap', 'OncoPro', 'RejuvIA', 'ROMIMED'];

// Regex para encontrar rutas absolutas a recursos locales
const ABSOLUTE_PATH_REGEX = /(?:href|src|url)\s*=\s*["'](\/[^"']+\.(?:html|css|js|jpg|jpeg|png|gif|svg|ico|woff|woff2|ttf|eot|json|pdf|mp4|webm))["']/gi;
const CSS_URL_REGEX = /url\s*\(\s*["']?(\/[^"')]+)["']?\s*\)/gi;

const issues = [];
const warnings = [];
const suggestions = [];

function findFiles(dir, extension) {
  const files = [];
  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        files.push(...findFiles(fullPath, extension));
      } else if (entry.name.endsWith(extension)) {
        files.push(fullPath);
      }
    }
  } catch (err) {
    // Ignorar errores de lectura
  }
  return files;
}

function resolvePath(baseDir, path) {
  // Si es ruta absoluta, resolver desde public/
  if (path.startsWith('/')) {
    return join(PUBLIC_DIR, path.substring(1));
  }
  // Si es relativa, resolver desde el directorio base
  return resolve(baseDir, path);
}

function checkResourceExists(filePath, referencedFrom, resourcePath) {
  const resolvedPath = resolvePath(dirname(filePath), resourcePath);
  
  if (!existsSync(resolvedPath)) {
    issues.push({
      type: 'missing_resource',
      file: relative(ROOT, filePath),
      resource: resourcePath,
      resolved: relative(ROOT, resolvedPath),
      suggestion: resourcePath.startsWith('/') 
        ? `Cambiar a ruta relativa: ./${basename(resourcePath)} o ${resourcePath.split('/').pop()}`
        : `Verificar que el archivo exista: ${relative(ROOT, resolvedPath)}`
    });
    return false;
  }
  return true;
}

function analyzeHTML(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const dir = dirname(filePath);
  const siteName = basename(dir);
  
  // Buscar rutas absolutas en HTML
  let match;
  ABSOLUTE_PATH_REGEX.lastIndex = 0;
  while ((match = ABSOLUTE_PATH_REGEX.exec(content)) !== null) {
    const absolutePath = match[1];
    const fullMatch = match[0];
    
    // Ignorar URLs externas (http/https)
    if (absolutePath.startsWith('http://') || absolutePath.startsWith('https://')) {
      continue;
    }
    
    // Ignorar anclas (#)
    if (absolutePath.startsWith('#')) {
      continue;
    }
    
    // Si es un recurso local con ruta absoluta, sugerir cambio
    if (absolutePath.startsWith('/')) {
      const resourceName = basename(absolutePath);
      const relativeEquivalent = `./${resourceName}`;
      
      // Verificar si el recurso existe localmente en el mismo sitio
      const resolvedPath = join(PUBLIC_DIR, absolutePath.substring(1));
      if (existsSync(resolvedPath)) {
        // Verificar si está dentro del mismo sitio legacy
        const resourceDir = dirname(resolvedPath);
        const resourceSiteName = basename(resourceDir);
        
        if (resourceSiteName === siteName || resourceDir === PUBLIC_DIR) {
          warnings.push({
            type: 'absolute_path_local_resource',
            file: relative(ROOT, filePath),
            line: content.substring(0, match.index).split('\n').length,
            match: fullMatch,
            suggestion: `Considerar cambiar a ruta relativa: ${fullMatch.replace(absolutePath, relativeEquivalent)}`
          });
        } else {
          // Recurso existe pero en otro sitio - puede ser intencional
          suggestions.push({
            type: 'absolute_path_cross_site',
            file: relative(ROOT, filePath),
            resource: absolutePath,
            note: `El recurso existe pero en otro sitio (${resourceSiteName}). Verificar si es intencional.`
          });
        }
      } else {
        // Recurso no encontrado
        checkResourceExists(filePath, filePath, absolutePath);
      }
    }
  }
  
  // Buscar en estilos inline (url() en CSS)
  const styleMatches = content.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
  if (styleMatches) {
    styleMatches.forEach((styleBlock, idx) => {
      CSS_URL_REGEX.lastIndex = 0;
      while ((match = CSS_URL_REGEX.exec(styleBlock)) !== null) {
        const urlPath = match[1];
        if (urlPath.startsWith('/') && !urlPath.startsWith('//')) {
          const resourceName = basename(urlPath);
          const resolvedPath = join(PUBLIC_DIR, urlPath.substring(1));
          
          if (existsSync(resolvedPath)) {
            const resourceDir = dirname(resolvedPath);
            const resourceSiteName = basename(resourceDir);
            
            if (resourceSiteName === siteName) {
              warnings.push({
                type: 'absolute_url_in_css',
                file: relative(ROOT, filePath),
                match: match[0],
                suggestion: `Considerar cambiar a ruta relativa: url("../${resourceName}") o url("./${resourceName}") dependiendo de la ubicación del CSS`
              });
            }
          } else {
            checkResourceExists(filePath, filePath, urlPath);
          }
        }
      }
    });
  }
}

function analyzeCSS(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const dir = dirname(filePath);
  
  CSS_URL_REGEX.lastIndex = 0;
  let match;
  while ((match = CSS_URL_REGEX.exec(content)) !== null) {
    const urlPath = match[1];
    
    if (urlPath.startsWith('/') && !urlPath.startsWith('//')) {
      const resolvedPath = join(PUBLIC_DIR, urlPath.substring(1));
      if (!existsSync(resolvedPath)) {
        checkResourceExists(filePath, filePath, urlPath);
      }
    }
  }
}

function generateReport() {
  console.log('\n' + '='.repeat(80));
  console.log('📋 REPORTE DE VERIFICACIÓN DE SITIOS LEGACY ESTÁTICOS');
  console.log('='.repeat(80) + '\n');
  
  if (issues.length === 0 && warnings.length === 0 && suggestions.length === 0) {
    console.log('✅ No se encontraron problemas. Todos los recursos referenciados existen y las rutas están correctas.\n');
    return;
  }
  
  if (issues.length > 0) {
    console.log(`❌ PROBLEMAS CRÍTICOS (${issues.length}):\n`);
    issues.forEach((issue, idx) => {
      console.log(`${idx + 1}. [${issue.type.toUpperCase()}]`);
      console.log(`   Archivo: ${issue.file}`);
      console.log(`   Recurso: ${issue.resource}`);
      console.log(`   Resuelto a: ${issue.resolved}`);
      if (issue.suggestion) {
        console.log(`   💡 Sugerencia: ${issue.suggestion}`);
      }
      console.log('');
    });
  }
  
  if (warnings.length > 0) {
    console.log(`⚠️  ADVERTENCIAS (${warnings.length}):\n`);
    warnings.forEach((warning, idx) => {
      console.log(`${idx + 1}. [${warning.type.toUpperCase()}]`);
      console.log(`   Archivo: ${warning.file}`);
      if (warning.line) {
        console.log(`   Línea aproximada: ${warning.line}`);
      }
      if (warning.match) {
        console.log(`   Match: ${warning.match.substring(0, 80)}${warning.match.length > 80 ? '...' : ''}`);
      }
      if (warning.suggestion) {
        console.log(`   💡 Sugerencia: ${warning.suggestion}`);
      }
      console.log('');
    });
  }
  
  if (suggestions.length > 0) {
    console.log(`💡 SUGERENCIAS (${suggestions.length}):\n`);
    suggestions.forEach((suggestion, idx) => {
      console.log(`${idx + 1}. [${suggestion.type.toUpperCase()}]`);
      console.log(`   Archivo: ${suggestion.file}`);
      if (suggestion.resource) {
        console.log(`   Recurso: ${suggestion.resource}`);
      }
      if (suggestion.note) {
        console.log(`   Nota: ${suggestion.note}`);
      }
      console.log('');
    });
  }
  
  console.log('='.repeat(80));
  console.log(`\nResumen: ${issues.length} problemas, ${warnings.length} advertencias, ${suggestions.length} sugerencias\n`);
}

// Función principal
function main() {
  console.log('🔍 Verificando sitios legacy estáticos...\n');
  
  for (const site of LEGACY_SITES) {
    const siteDir = join(PUBLIC_DIR, site);
    
    if (!existsSync(siteDir)) {
      console.log(`⚠️  Directorio no encontrado: ${site}`);
      continue;
    }
    
    console.log(`📁 Analizando ${site}...`);
    
    // Buscar archivos HTML
    const htmlFiles = findFiles(siteDir, '.html');
    htmlFiles.forEach(file => {
      analyzeHTML(file);
    });
    
    // Buscar archivos CSS
    const cssFiles = findFiles(siteDir, '.css');
    cssFiles.forEach(file => {
      analyzeCSS(file);
    });
  }
  
  generateReport();
  
  // Exit code basado en si hay problemas críticos
  process.exit(issues.length > 0 ? 1 : 0);
}

main();

