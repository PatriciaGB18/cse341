const router = require('express').Router();
const passport = require('passport');

const swaggerUi = require('swagger-ui-express');
let swaggerDocument;
try {
    swaggerDocument = require('../swagger.json');
} catch (e) {
    swaggerDocument = {}; 
}

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.use('/books', require('./books'));
router.use('/authors', require('./authors'));
router.use('/genres', require('./genres'));
router.use('/users', require('./users'));


router.get('/login', passport.authenticate('github', { scope: [ 'user:email' ] }));


router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});


router.get('/github/callback', 
  passport.authenticate('github', { 
    failureRedirect: '/api-docs', 
    session: true 
  }),
  (req, res) => {
    req.session.user = req.user; 
    res.redirect('/');
  }
);

module.exports = router;