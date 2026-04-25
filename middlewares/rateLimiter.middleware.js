const rateLimit = require('express-rate-limit');
const { ipKeyGenerator } = require('express-rate-limit');

 
const globalLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    max: 1000,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: 'Too many requests, please try again after 24 hours'
        });
    }
});

 
const strictLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    max: 3,
    standardHeaders: true,
    legacyHeaders: false,
    
    keyGenerator: (req, res) => `strict:${req.user?.id || ipKeyGenerator(req, res)}`,
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: 'Only 3 requests allowed per 24 hours!'
        });
    }
});

module.exports = { globalLimiter, strictLimiter };