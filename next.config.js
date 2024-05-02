/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGODB_URL: process.env.MONGODB_URL,
        GOOGLE_MAP_API: process.env.GOOGLE_MAP_API
    }
};

module.exports = nextConfig;
