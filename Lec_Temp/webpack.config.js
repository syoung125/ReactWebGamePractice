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
  output: {
    path: path.join(__dirname, "dist"), //__dirname: 현재 폴더 -> 현재 폴더 안의 dist
    filename: "app.js",
  }, // 출력
};
