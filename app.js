var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const env = require("dotenv").config();

var usersRouter = require("./routes/userRouter");
var authRouter = require("./routes/authRouter");
var charactersRouter = require("./routes/charactersRouter");
var moviesRouter = require("./routes/moviesRouter");
var genresRouter = require("./routes/genresRouter");
var tokenVerify = require("./middlewares/tokenMiddlware");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "uploads/images")));

app.use("/auth", authRouter);
app.use(tokenVerify);
app.use("/users", usersRouter);
app.use("/characters", charactersRouter);
app.use("/movies", moviesRouter);
app.use("/genres", genresRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
