const PROXY_CONFIG = [
  {
    context: [
      "/Products",
      "/Account",
      "/Home",
      "/api"
    ],
    target: "http://localhost:5218",
    secure: false,
    changeOrigin: true,
    logLevel: "debug"
  }
];

module.exports = PROXY_CONFIG;
