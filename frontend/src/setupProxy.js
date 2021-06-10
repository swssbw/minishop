const proxy = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api/v1",
    proxy({
      target: "http://localhost:4000",
      changeOrigin: true,
    })
  );
};
