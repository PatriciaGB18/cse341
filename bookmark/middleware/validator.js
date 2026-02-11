const { body, validationResult } = require('express-validator');


const genreValidationRules = () => {
  return [
    body('name').notEmpty().withMessage('Name is required').isString(),
    body('description').optional().isString()
  ];
};



const bookValidationRules = () => {
  return [
    body('title').notEmpty().withMessage('Title is required'),
    body('isbn').notEmpty().withMessage('ISBN is required'),
    
    body('authorId').notEmpty().withMessage('Author ID is required'),
    body('genreId').notEmpty().withMessage('Genre ID is required'),
    body('publishDate').optional().isDate().withMessage('Must be a valid date (YYYY-MM-DD)')
  ];
};


const userValidationRules = () => {
  return [
    body('githubId').notEmpty().withMessage('githubId is required'),
    body('username').notEmpty().withMessage('Username is required').isLength({ min: 3 }),
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('displayName').notEmpty().withMessage('Display Name is required')
  ];
};


const authorValidationRules = () => {
  return [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('birthDate').optional().isDate().withMessage('Must be a valid date (YYYY-MM-DD)'),
    body('nationality').optional().isString()
  ];
};


const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.path || err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  genreValidationRules,
  bookValidationRules,
  userValidationRules,
  authorValidationRules,
  validate,
};