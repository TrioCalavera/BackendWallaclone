var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var logger = require("morgan");
const { isAPIRequest } = require("./lib/utils");
var expressValidator = require("express-validator");
var config = require("./lib/configCors");

var indexRouter = require("./routes/index");
var usersRouterV1 = require("./routes/api/v1/users");
var advertsRouterV1 = require("./routes/api/v1/adverts");
var authenticationRouterV1 = require("./routes/api/v1/authetication");
var tagsRouterV1 = require("./routes/api/v1/tags");

var app = express();

// instalacion de cors
var cors = require("cors");
app.use(cors(config.application.cors.server));
// app.use(cors());

require("./lib/connectMongoose");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/**
 * Middlewares
 */
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//  Routes API V1
app.use("/",indexRouter);
app.use("/api", indexRouter);
app.use("/api/v1/users", usersRouterV1);
app.use("/api/v1/adverts", advertsRouterV1);
app.use("/api/v1/authentication", authenticationRouterV1);
app.use("/api/v1/tags", tagsRouterV1);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  if (isAPIRequest(req)) {
    res.json({ error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page

  res.render("error");
});

module.exports = app;
