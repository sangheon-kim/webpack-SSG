const path = require("path");
const fs = require("fs");
const parseRouteFn = require("./_config/routeConfig");
const routes = require("./routes.json");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let parseRoute = parseRouteFn(routes);

const readBodyFile = (name) => {
  try {
    const content = fs.readFileSync(path.join(__dirname, "./src/views", `${name}.body`), "utf-8");

    return content;
  } catch {
    return "";
  }
};

const config = {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("sass"),
              sassOptions: {
                fiber: require("fibers"),
              },
            },
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    // tsconfig에 지정한 것을 paths와 baseUrl을 인식하여 자동 처리
    // alias 처리 필요 없음.
    plugins: [new TsconfigPathsPlugin({ configFile: `${path.join(__dirname, "tsconfig.json")}` })],
  },
};

module.exports = [
  ...parseRoute.map(({ name, projectName, title }) => {
    const fileName = name !== projectName ? name : "index";
    return Object.assign({}, config, {
      entry: path.join(__dirname, `./src/pages/${projectName}/${fileName}.ts`),
      output: {
        filename: `${projectName}/assets/script.js`,
        path: path.resolve(__dirname, `dist`),
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: `${projectName}/assets/style.css`,
          chunkFilename: "[id].css",
        }),
        new HtmlWebpackPlugin({
          title: title,
          template: path.join(__dirname, "index.html"),
          filename: `${projectName}/${fileName}.html`,
          meta: {
            viewPort: "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0",
          },
          bodyInitialize: readBodyFile(name),
        }),
      ],
    });
  }),
];
