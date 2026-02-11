const express = require('express');
const router = express.Router();
const genresController = require('../controllers/genres');


const { genreValidationRules, validate } = require('../middleware/validator');
const { isAuthenticated } = require('../middleware/authenticate');


router.get('/', genresController.getAll);
router.get('/:id', genresController.getSingle);


router.post('/', isAuthenticated, genreValidationRules(), validate, genresController.createGenre);


router.put('/:id', isAuthenticated, genreValidationRules(), validate, genresController.updateGenre);


router.delete('/:id', isAuthenticated, genresController.deleteGenre);

module.exports = router;