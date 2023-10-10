const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const dotenv = require("dotenv");
const express = require("express");
const logger = require("morgan");
const routeGeneratePDFReport = require("./dist/generate-pdf-report");

// Configure the environment
dotenv.config();

// Instantiate the app
const app = express();

// Body parsing middleware
app.use(express.static(__dirname + 'public')); // Serves resources from public folder
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//enable CORS (for testing only -remove in production/deployment)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Routes
app.use("/api/generate-pdf-report", routeGeneratePDFReport);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
	// Set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// Render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
