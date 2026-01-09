import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value || req.headers.get('authorization');
  const { pathname } = req.nextUrl;

  // Rutas legacy estáticas - EXCLUIR completamente del middleware
  // El matcher ya las excluye, pero por seguridad también las verificamos aquí
  const legacySites = ['/Edu', '/efysia', '/NutriSnap', '/OncoPro', '/RejuvIA', '/ROMIMED'];
  
  for (const site of legacySites) {
    if (pathname === site || pathname === `${site}/` || pathname.startsWith(`${site}/`)) {
      return NextResponse.next();
    }
  }

  const protectedPrefixes = ['/appointments', '/dashboard', '/chat', '/doctor','/Seguimiento']; // ajusta a tus privadas

  if (protectedPrefixes.some(p => pathname.startsWith(p)) && !token) {
    const url = req.nextUrl.clone();
    url.pathname = '/Auth/Login'; // respeta mayúsculas de tu ruta real
    url.search = `?next=${encodeURIComponent(pathname)}`;
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

// Configurar matcher para evitar interferir con archivos estáticos y rutas legacy
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - files with extensions (images, css, js, etc.)
     * - legacy static sites (excluidos explícitamente)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|Edu|efysia|NutriSnap|OncoPro|RejuvIA|ROMIMED|.*\\..*).*)',
  ],
};
