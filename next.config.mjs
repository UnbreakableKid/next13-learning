import "./env.mjs";


/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'placehold.co', 'uploadthing.com'],
  },

}

export default nextConfig
