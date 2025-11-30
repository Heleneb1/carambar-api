

//avec ts-errors
const { CustomError } = require("@heleneb1/ts-errors");

function errorHandler(err, req, res, next) {
    console.log("ERR STATUSCODE =", err.statusCode);
    console.log(typeof err.statusCode);


    if (err instanceof CustomError) {
        err.log(); // Log formaté selon la lib

        return res.status(err.statusCode).json({
            emoji: err.emoji,
            message: err.message,
            statusCode: err.statusCode,
            category: err.category,
            details: err.details || null,
        });
    }

    // Si c’est une erreur non gérée
    console.error("❌ Unexpected error:", err);

    return res.status(500).json({
        message: "Internal Server Error",
    });
}

module.exports = errorHandler;
