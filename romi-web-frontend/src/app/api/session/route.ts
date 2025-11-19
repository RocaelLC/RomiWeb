import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { accessToken } = await req.json();
  if (!accessToken) return NextResponse.json({ error: 'Missing token' }, { status: 400 });

  const res = NextResponse.json({ ok: true });
  res.cookies.set('romi_token', accessToken, {
    httpOnly: true, secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', path: '/', maxAge: 60*60*8,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set('romi_token', '', { httpOnly: true, path: '/', maxAge: 0 });
  return res;
}
