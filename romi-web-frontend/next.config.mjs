/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // Redirects permanentes (301) para rutas legacy sin slash final
    return [
      {
        source: '/Edu',
        destination: '/Edu/',
        permanent: true,
      },
      {
        source: '/efysia',
        destination: '/efysia/',
        permanent: true,
      },
      {
        source: '/NutriSnap',
        destination: '/NutriSnap/',
        permanent: true,
      },
      {
        source: '/OncoPro',
        destination: '/OncoPro/',
        permanent: true,
      },
      {
        source: '/RejuvIA',
        destination: '/RejuvIA/',
        permanent: true,
      },
      {
        source: '/ROMIMED',
        destination: '/ROMIMED/',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    // Proxy local para apuntar al backend Nest
    return [
      {
        source: '/auth/:path*',
        destination: 'http://localhost:3001/auth/:path*',
      },
      {
        source: '/api-romi/:path*',
        destination: 'http://localhost:3001/:path*',
      },
    ];
  },
};

export default nextConfig;
