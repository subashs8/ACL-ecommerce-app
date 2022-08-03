const PORT = process.env.PORT || 3000;

// import custom modules
const connectDB = require('./utils/dbConn');

// import routes
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const employeeRoutes = require('./routes/employee');
const customerRoutes = require('./routes/customer');

// import npm modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// create express app
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to database
connectDB();

// cors || should be placed b4 any routes
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH');
        res.status(200).json({});
    }
    next();
});

app.get('/', function (req, res) {
    res.send('Server Running');
});

// routes
app.use('/product', productRoutes);
app.use('/cart', cartRoutes);
app.use('/employee', employeeRoutes);
app.use('/customer', customerRoutes);

// error handling if route is not found 
// placed after all routes, cos it will be called only after all routes failed to match
app.use((req, res, next) => {
    const error = new Error('Endpoint not found');
    error.status = 404;
    next(error);
});

// error handling of entire application
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message: error.message
    });
});

// on mongoose db connected, listen to express app port
mongoose.connection.once('open', () => {
    app.listen(PORT, function () {
        console.log('Port Listening');
    });
});