/** @type {import('next').NextConfig} */
const nextConfig = {
  // NO usar trailingSlash: true porque afecta todas las rutas de Next.js
  // En su lugar, usamos redirects específicos que apuntan directamente a index.html
  
  async redirects() {
    // Redirects permanentes (301) para rutas legacy sin slash final
    // Redirigimos directamente a index.html para evitar loops con trailing slashes
    return [
      {
        source: '/Edu',
        destination: '/Edu/index.html',
        permanent: true,
      },
      {
        source: '/efysia',
        destination: '/efysia/index.html',
        permanent: true,
      },
      {
        source: '/NutriSnap',
        destination: '/NutriSnap/index.html',
        permanent: true,
      },
      {
        source: '/OncoPro',
        destination: '/OncoPro/index.html',
        permanent: true,
      },
      {
        source: '/RejuvIA',
        destination: '/RejuvIA/index.html',
        permanent: true,
      },
      {
        source: '/ROMIMED',
        destination: '/ROMIMED/index.html',
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
