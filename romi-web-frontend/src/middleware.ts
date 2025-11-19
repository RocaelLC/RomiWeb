import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value || req.headers.get('authorization');
  const { pathname } = req.nextUrl;

  const protectedPrefixes = ['/appointments', '/dashboard', '/chat', '/doctor','/Seguimiento']; // ajusta a tus privadas

  if (protectedPrefixes.some(p => pathname.startsWith(p)) && !token) {
    const url = req.nextUrl.clone();
    url.pathname = '/Auth/Login'; // respeta mayúsculas de tu ruta real
    url.search = `?next=${encodeURIComponent(pathname)}`;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
  
}
