const router = require('express').Router();


// Home route
router.get('/', (req, res) => {
    return res.send('Welcome To To-Do Server')
})


module.exports = router;