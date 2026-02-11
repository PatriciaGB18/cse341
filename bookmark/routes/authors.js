const express = require('express');
const router = express.Router();
const authorsController = require('../controllers/authors');
const { authorValidationRules, validate } = require('../middleware/validator');
const { isAuthenticated } = require('../middleware/authenticate');


router.get('/', authorsController.getAllAuthors);
router.get('/:id', authorsController.getSingleAuthor);


router.post('/', isAuthenticated, authorValidationRules(), validate, authorsController.createAuthor);
router.put('/:id', isAuthenticated, authorValidationRules(), validate, authorsController.updateAuthor);


router.delete('/:id', isAuthenticated, authorsController.deleteAuthor);

module.exports = router;