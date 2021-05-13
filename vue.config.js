const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
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
      title: "Todo Demo",
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
      },
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        configFile: "./tsconfig.client.json",
      }),
      // To strip all locales except “en”
      new MomentLocalesPlugin(),
    ],
  },
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost",
        ws: true,
        changeOrigin: true,
        secure: false,
        pathRewrite: { "^/api": "" },
        logLevel: "debug",
      },
    },
  },
};
