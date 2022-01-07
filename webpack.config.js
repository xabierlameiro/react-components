const path = require("path");

const serviceWorkerConfig = {
  entry: "./lib/config/firebase-messaging-sw.js",
  module: {
    rules: [
      {
        test: /\.m?js/,
      },
    ],
  },
  output: {
    filename: "firebase-messaging-sw.js",
    path: path.resolve(__dirname, "../../public"),
  },
};

module.exports = [serviceWorkerConfig];
