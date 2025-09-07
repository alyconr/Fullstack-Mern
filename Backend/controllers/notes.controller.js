const db =   require('../db/connect');
const { StatusCodes } = require('http-status-codes');

const getNotes = async (req, res, next) => {
    try {
        const sql = 'SELECT * FROM notes WHERE user_id = ?';
        const [rows] = await db.promise().query(sql, [req.user.id]);

        res.status(StatusCodes.OK).json({
            msg: 'Notas obtenidas con exito',
            notes: rows
        });

    } catch (err) {
        next(err);
    }
}

const createNote = async (req, res, next) => {
    try {
        const { title, content } = req.body;

        const sql = 'INSERT INTO notes (title, content, user_id) VALUES (?, ?, ?)';
        const [result] = await db.promise().query(sql, [title, content, req.user.id]);

        res.status(StatusCodes.CREATED).json({
            msg: 'Nota creada con exito',
            note: {
                id: result.insertId,
                title,
                content
            }
        });

    } catch (err) {
        next(err);
    }
};

const updateNote = async (req, res, next) => {
    try {
        const { title, content } = req.body;
        const { id } = req.params;

        const sql = 'UPDATE notes SET title = ?, content = ? WHERE id = ? AND user_id = ?';
        const [result] = await db.promise().query(sql, [title, content, id, req.user.id]);

        if (result.affectedRows === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Nota no encontrada' });
        }

        res.status(StatusCodes.OK).json({
            msg: 'Nota actualizada con exito',
            note: {
                id,
                title,
                content
            }
        });

    } catch (err) {
        next(err);
    }
};
const deleteNote = async (req, res, next) => {
    try {
        const { id } = req.params;

        const sql = 'DELETE FROM notes WHERE id = ? AND user_id = ?';
        const [result] = await db.promise().query(sql, [id, req.user.id]);

        if (result.affectedRows === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Nota no encontrada' });
        }

        res.status(StatusCodes.OK).json({
            msg: 'Nota eliminada con exito'
        });

    } catch (err) {
        next(err);
    }
};

module.exports = {
    getNotes,
    createNote,
    updateNote,
    deleteNote
};