import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**', // Permite qualquer caminho dentro desse hostname
            },
        ],
    },
};

export default nextConfig;
