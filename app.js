const express = require("express");
const app = express();
const errorHandler = require("./utilities/errorHandler");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// configure routes
const accountRouter = require("./routes/account");
const recordRouter = require("./routes/painlog");
const postRouter = require("./routes/post");
const messageRouter = require("./routes/message");

app.use("/account", accountRouter);
app.use("/record", recordRouter);
app.use("/post", postRouter);
app.use("/message", messageRouter);

//error handling
app.use((error, req, res, next) => {
    errorHandler(error, req, res, next);
});

module.exports = app;
