const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/student",
    createProxyMiddleware({
      target: "http://class-attendance-api.eu-central-1.elasticbeanstalk.com",
      changeOrigin: true
    })
  );
  app.use(
    "/auth",
    createProxyMiddleware({
      target: "http://class-attendance-api.eu-central-1.elasticbeanstalk.com",
      changeOrigin: true
    })
  );
  app.use(
    "/attendance",
    createProxyMiddleware({
      target: "http://class-attendance-api.eu-central-1.elasticbeanstalk.com",
      changeOrigin: true
    })
  );
  app.use(
    "/lecturer",
    createProxyMiddleware({
      target: "http://class-attendance-api.eu-central-1.elasticbeanstalk.com",
      changeOrigin: true
    })
  );
  app.use(
    "/course",
    createProxyMiddleware({
      target: "http://class-attendance-api.eu-central-1.elasticbeanstalk.com",
      changeOrigin: true
    })
  );
};
