const rateLimit = require('express-rate-limit');
 
const { ipKeyGenerator } = require('express-rate-limit');

const globalLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    max: 1000,
    keyGenerator: (req) => ipKeyGenerator(req), 
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: 'Too many requests, please try again after 24 hours'
        });
    }
});
 const loginLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    max: 3,
    
    
    keyGenerator: (req) => `login:${ipKeyGenerator(req)}`,
    
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: 'Only 3 login attempts allowed per 24 hours!'
        });
    }
});


const strictLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    max: 3,
 
    keyGenerator: (req) => req.user?.id || ipKeyGenerator(req),
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: 'Only 3 requests allowed per 24 hours!'
        });
    }
});

module.exports = { globalLimiter, loginLimiter, strictLimiter };