const mongoose = require('mongoose');
const connectionStringTestDb = 'mongodb+srv://subashk2:bruh123@cluster.zvp6c.mongodb.net/?retryWrites=true&w=majority';


// mongo db connection
const connectDB = async() => {
    try {
        await mongoose.connect(connectionStringTestDb, {
            useUnifiedTopology : true,
            useNewUrlParser: true
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB;