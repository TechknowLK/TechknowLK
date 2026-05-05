/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/admin/dashboard',
                permanent: false,
            },
        ];
    },
};

export default nextConfig;
