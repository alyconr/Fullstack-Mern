const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../db/connect')
const { StatusCodes } = require('http-status-codes')
//register

const register = async (req, res, next) => {

    try {
        const { username, email, password } = req.body;

        const hashed = await bcrypt.hash(password, 10);

        const [result] = await db.promise().query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [username, email, hashed]
        );

        res.status(StatusCodes.CREATED).json({
            msg: 'Usuario Registrado con exito',
            user: {
                id: result.insertId,
                name: username,
                email: email
            }
        });

    } catch (err) {
        next(err)
    }
};

const login = async (req, res, next) => {

    try {
        const { email, password } = req.body;

        const sql = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await db.promise().query(sql, [email]);

        if (rows.length === 0) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Credenciales incorrectas' });
        }
        const user = rows[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Credenciales incorrectas' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res
            .cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'none',
            })
            .status(StatusCodes.OK)
            .json({
                msg: 'Inicio de sesión exitoso',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
                token
            });
       


    } catch (err) {
        next(err)
    }



}

module.exports = { register, login }
