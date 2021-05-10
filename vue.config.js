const CopyWebpackPlugin = require("copy-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const path = require("path");

module.exports = {
  css: {
    sourceMap: true,
  },
  outputDir: "dist/client",
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
    resolve: {
      alias: {
        "@client": path.resolve(__dirname, "src/client/"),
        "@components": path.resolve(__dirname, "src/client/components/"),
        "@assets": path.resolve(__dirname, "src/client/assets/"),
        "@pages": path.resolve(__dirname, "src/client/pages/"),
        moment: "moment/src/moment",
      },
    },
    plugins: [new CopyWebpackPlugin([{ from: "./netlify.toml", to: "" }])],
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
