const path = require("path");

module.exports = {
  name: "wordrelay-seting",
  mode: "development", // 실서비스에서는 production으로 변경
  devtool: "eval",
  resolve: {
    extensions: [".js", ".jsx"], // entry.app에 확장자를 안써도 되게 됨
  },

  entry: {
    app: ["./client"], // 이 client 에서 WordRelay.js를 불러오기 때문에 써줄 필요 x
  }, // 입력

  module: {
    rules: [
      {
        test: /\.jsx?/, // js파일과 jsx파일에 rule을 적용하겠다
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: ["@babel/plugin-proposal-class-properties"],
        },
      },
    ],
  },

  output: {
    path: path.join(__dirname, "dist"), //__dirname: 현재 폴더 -> 현재 폴더 안의 dist
    filename: "app.js",
  }, // 출력
};

/*
webpack이라는 명령어를 치면 여기있는 entry를 읽어서 
app.js(output.filename)라는 한 파일르 만들어줌 
(webpack 명령어가 안먹히면 -> npx webpack)
*/
