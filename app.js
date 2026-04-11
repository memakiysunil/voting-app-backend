require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('./config/db');
const errorHandler = require('./middlewares/errorMiddleware');
const {globalLimiter} = require('./middlewares/rateLimiter.middleware');
const userrouter = require('./routes/user.routes');
const candidaterouter = require('./routes/candidate.routes');

 

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(globalLimiter);
 


app.use('/user', userrouter);
app.use('/candidate',candidaterouter);

app.use(errorHandler);

app.get('/', (req, res) => {
    res.json({message: 'voting Backend Running...'});
});

module.exports = app;