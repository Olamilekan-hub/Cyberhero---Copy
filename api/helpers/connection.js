const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
let isConnected;

const createConnection = async () => {
  if (isConnected) {
    // console.log("=> using existing database connection");
    return Promise.resolve();
  }

  // console.log("=> using new database connection");
  const db = await mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false,
  });
  isConnected = db.connections[0].readyState;

  return db.connections[0];
};

module.exports = { createConnection };
