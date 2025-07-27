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
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "Content-Security-Policy",
                        value:
                            "frame-ancestors 'self' https://www.google.com https://www.recaptcha.net;",
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
