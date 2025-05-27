const express = require('express');
const router = express.Router();


router.get('/', getNotes );
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);


module.exports= router;

