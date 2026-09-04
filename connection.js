const mongoose = require("mongoose");

const connect = async (url) => {
 await mongoose.connect(url).then(console.log("connect..."));
};

module.exports = { 
    connect,
}