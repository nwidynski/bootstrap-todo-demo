module.exports = {
  overrides: [
    {
      test: "src/client",
      presets: ["@vue/cli-plugin-babel/preset"],
    },
    {
      test: "src/server",
      presets: ["@babel/preset-typescript", "@babel/preset-env"],
      plugins: [
        [
          "module-resolver",
          {
            root: ["./src/server"],
            alias: {
              "@controller": "./controller",
              "@routes": "./routes",
            },
          },
        ],
      ],
    },
  ],
};
