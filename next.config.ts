import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        tsconfigPath: "./tsconfig.json",
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.(mp4|webm|ogg|mov)$/i,
            type: 'asset/resource',
            generator: {
                filename: 'static/media/[name].[hash][ext]',
            },
        });
        return config;
    },
};

export default nextConfig;
