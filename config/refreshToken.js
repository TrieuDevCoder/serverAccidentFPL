require('dotenv').config(); // Load environment variables from .env file
const jwt = require('jsonwebtoken');

const generateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

module.exports =  {generateRefreshToken}  ;

