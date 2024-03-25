const router = require('express').Router();
const fs = require('fs');

// Home route
router.get('/', (req, res) => {
    // Read index.html file synchronously
    const htmlContent = fs.readFileSync('index.html', 'utf8');
    
    // Send the HTML content as response
    return res.send(htmlContent);
});

module.exports = router;
