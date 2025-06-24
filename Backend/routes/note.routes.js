const express = require('express');
const router = express.Router();

const authenticateToken = require('../middlewares/auth.middleware');

const { getNotes, createNote, updateNote, deleteNote } = require('../controllers/notes.controller');


router.get('/', getNotes );
router.post('/',  authenticateToken, createNote);
router.put('/:id', authenticateToken, updateNote);
router.delete('/:id',  authenticateToken, deleteNote);


module.exports= router;

/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Crear una nueva nota
 *     tags: [Notes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 example: Mi primera nota
 *               content:
 *                 type: string
 *                 example: Este es el contenido de la nota.
 *     responses:
 *       201:
 *         description: Nota creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Nota creada
 *       401:
 *         description: Token JWT ausente o inválido
 *       500:
 *         description: Error del servidor
 */

