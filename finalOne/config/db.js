// databse connection
const mongoose = require('mongoose');
require('dotenv').config();

// define a async function(connect-DB)
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://vikram:vikram05@backenddb.rndifhk.mongodb.net/?retryWrites=true&w=majority&appName=backendDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
// export the funvtion
module.exports = connectDB;

