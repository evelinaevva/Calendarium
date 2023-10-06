const express = require("express");
const db = require("./db/models");
const passport = require("passport");
require("./googleAuth");

const serverConfig = require("./config/server-config");
// экспорт middleware

const errorMiddleware = require("./middlewares/error.middleware");
const apiRouter = require("./routes/api/index.routes");
const mainRouter = require("./routes/main.routes");
const GoogleRouter = require("./routes/api/google.routes");

const notifyService = require('./services/notify.service');

const app = express();
const PORT = process.env.EXPRESS_PORT | 5000;

serverConfig(app);

app.use("/auth", GoogleRouter);
app.use("/api", apiRouter);
app.use("/", mainRouter);
app.use(errorMiddleware);

app.listen(PORT, async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
    console.log(`Server start on port: ${PORT}`);
    setTimeout(function main() {
      notifyService.checkAndNotify();
      setTimeout(main, 1000*60) // 1 мин
    }, 1000 );
  } catch (e) {
    console.log(e);
  }
});
