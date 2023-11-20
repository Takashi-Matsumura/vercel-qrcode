/** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig

//const { InjectManifest } = require("workbox-webpack-plugin");

const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  // next.js config
});

// const withPWA = require("next-pwa");

// module.exports = withPWA({
//   pwa: {
//     dest: "public",
//   },
// });
