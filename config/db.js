const mongoose = require('mongoose');

const connectDatabase = () => {
  mongoose.connect(process.env.DB_URL)
  try {
    console.log(`DB connected...`);
  } catch (error) {
    console.log(error)
  }
};

module.exports = connectDatabase;
