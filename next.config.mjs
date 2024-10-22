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
            value: "*" // Replace with your frontend origin
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST" // Allow GET, POST, and OPTIONS methods
          },

          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization" // Allow specific headers
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
