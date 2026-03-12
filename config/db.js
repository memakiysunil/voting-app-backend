const mongoose = require('mongoose');

const mongoURL = process.env.MONGO_URL;


mongoose.connect(mongoURL)
  .then(() => {
    console.log('Database Connected Successfully!');
  })
  .catch((error) => {
    console.log('Error connecting to database:', error);
  });

module.exports = mongoose;
