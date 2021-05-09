const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  css: {
    sourceMap: true,
  },
  outputDir: "dist",
  lintOnSave: false,
  pages: {
    index: {
      entry: "src/client/main.ts",
      template: "public/index.html",
      filename: "index.html",
      chunks: ["chunk-vendors", "chunk-common", "app", "index"],
    },
  },
  configureWebpack: {
    performance: {
      maxAssetSize: 500000,
    },
  },
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:8081",
        ws: true,
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/api": "" },
        logLevel: "debug",
      },
    },
  },
};
