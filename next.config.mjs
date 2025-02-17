/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "192.168.10.137",
                port: "5000",
                pathname: "/**",
            },
        ],
    }
};

export default nextConfig;
