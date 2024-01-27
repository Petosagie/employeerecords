const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => { 
    //#swagger.tags=['Home Page']
    res.send('Welcome to my page');
});

router.use('/employee', require('./employee'));
router.use('/user', require('./user'));

module.exports = router;