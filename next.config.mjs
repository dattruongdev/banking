/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // This will apply the headers to all API routes in `/api/*`
        source: "/api/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:3000" // Replace with your frontend origin
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,OPTIONS" // Allow GET, POST, and OPTIONS methods
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization" // Allow specific headers
          }
        ]
      }
    ];
  }
};

export default nextConfig;
