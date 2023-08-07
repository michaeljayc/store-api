require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const morgan = require('morgan');
const notFoundMiddleware = require('./middlewares/notFound');
const { errorHandlerMiddleware }= require('./middlewares/error-handler');
const authenticationMiddleware = require('./middlewares/auth');
const connectToDB = require('./db/dbConnect');
const products = require('./routes/product');
const auth = require("./routes/auth");
const users = require('./routes/user');


//middlewares
app.use(express.json());
app.use(morgan('tiny'));

// routes
app.use('/store-api/v1', auth);
app.use('/store-api/v1/users', authenticationMiddleware, users);
app.use('/store-api/v1/products', authenticationMiddleware, products);

// custom middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectToDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}...`);
        })
    } catch(err) {
        console.log("Error connecting to db.")
    }
}

start();



