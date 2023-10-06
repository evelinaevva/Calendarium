const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();
const cors = require("cors");
const passport = require("passport");

const corsOptions = {
  credentials: true,
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

const fileStoreOptions = {};

const sessionConfig = {
  store: new FileStore(fileStoreOptions),
  name: "auth",
  secret: process.env.SESSION_SECRET || "test",
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: "/",
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 10 * 1000,
  },
};


module.exports = function serverConfig(app) {
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors(corsOptions));
  app.use('/img', express.static(path.join(process.cwd(),'uploads')));
  app.use(session(sessionConfig));
  app.use(passport.initialize());
  app.use(passport.session());
};
