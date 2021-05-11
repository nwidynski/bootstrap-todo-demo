module.exports = {
  overrides: [
    {
      test: "src/client",
      presets: ["@vue/cli-plugin-babel/preset"],
    },
    {
      test: ".",
      exclude: ["node_modules", "dist", "public", "src/client"],
      presets: [
        "@babel/preset-typescript",
        ["@babel/preset-env", { useBuiltIns: "usage" }],
      ],
      plugins: [
        [
          "module-resolver",
          {
            root: ["./src/server"],
            alias: {
              "@controller": "./src/server/controller",
              "@routes": "./src/server/routes",
            },
          },
        ],
      ],
    },
  ],
};
