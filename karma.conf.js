const webpackConfig = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  }
};

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],

    files: [
      { pattern: "test/**/*.spec.js", watched: false }
    ],

    preprocessors: {
      "test/**/*.spec.js": ["webpack"]
    },

    webpack: webpackConfig,

    webpackMiddleware: { stats: "errors-only" },

    reporters: ["progress"],

    browsers: ["ChromeHeadless"],

    singleRun: true,

    colors: true,


    proxies: {
      "/nes.jpg": "/base/public/assets/nes.jpg",
      "/snes.jpg": "/base/public/assets/snes.jpg",
      "/n64.jpg": "/base/public/assets/n64.jpg",
      "/assets/": "/base/public/assets/"
    },


    exclude: [
      "src/index.js",
      "src/**/index.js",
      "src/setupTests.js"
    ],

    client: {
      clearContext: false,
      jasmine: { random: false }
    }
  });
};
