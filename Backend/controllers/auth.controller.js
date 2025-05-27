const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../db/connect')
const { StatusCodes } = require('http-status-codes')


const register = async (req, res, next) => {

    try {
        const { username, email, password } = req.body;

        const hashed = await bcrypt.hash(password, 10);

        const [result] = await db.promise().query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashed]
        );

        res.status(StatusCodes.CREATED).json({
            msg: 'Usuario Registrado con exito'
        });

    } catch (err) {
        next(err)
    }
};

const login = async (req, res, next) => {

    try {
        const { email, password } = req.body;


        const [rows] = await db.promise().query(
            'SELECT * FROM users WHERE email = ?', [email]
        );

        const user = rows[0];

        if (!user) return

        res.status(StatusCodes.UNAUTHORIZED).json({
            msg: 'Credenciales Invalidas'
        })

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) return
        res.status(StatusCodes.UNAUTHORIZED).json({
            msg: 'Credenciales invalidas'
        })

        const token = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.status(StatusCodes.OK).json({
            token
        });



    } catch (err) {
        next(err)
    }



}

module.exports = { register, login }
