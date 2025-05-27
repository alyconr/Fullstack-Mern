const { StatusCodes } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    const status = err.status || StatusCodes.INTERNAL_SERVER_ERROR;

    res.status(status).json({
        msg: err.message || ' Error inesperado del servidor'
    });

}

module.exports = errorHandler;

