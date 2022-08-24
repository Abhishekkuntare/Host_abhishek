const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");

// const dotenv = require("dotenv");
// dotenv.config({ path: "./config.env" });

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "./config.env" });
}

require("./db/conn");

app.use(express.json());
app.use(cookieParser());
app.use(require("./router/auth"));

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

const start = (port) => {
  try {
    app.listen(port, () => {
      console.log(`Api up and running at: http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit();
  }
};
start(process.env.PORT);
