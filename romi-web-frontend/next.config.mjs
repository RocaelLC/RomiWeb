/** @type {import('next').NextConfig} */
const nextConfig = {
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
