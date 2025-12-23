/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
            },
            {
                protocol: 'https',
                hostname: 'api.qrserver.com',
            },
        ],
    },
};

export default nextConfig;
