const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes')


const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) return
    res.status(StatusCodes.UNAUTHORIZED).json({
        msg: 'TOKEN REQUERIDO'
    });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return
        res.status(StatusCodes.FORBIDDEN).json({
            msg: 'Token Invalido'
        });

        req.user = user;
        next()
    })
}

module.exports = authenticateToken;