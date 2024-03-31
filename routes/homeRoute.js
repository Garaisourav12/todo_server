const homeRouter = require('express').Router();
const fs = require('fs');

// Home route
homeRouter.get('/', (req, res) => {
    // Read index.html file synchronously
    const htmlContent = fs.readFileSync('index.html', 'utf8');
    
    // Send the HTML content as response
    return res.send(htmlContent);
    // return res.send('Welsome to The To-Do Server');
});

module.exports = homeRouter;
