require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const morgan = require('morgan');
const notFoundMiddleware = require('./middlewares/notFound');
const { errorHandlerMiddleware }= require('./middlewares/error-handler');
const authenticationMiddleware = require('./middlewares/auth');
const connectToDB = require('./db/dbConnect');
const productRoute = require('./routes/product');
const authRoute = require("./routes/auth");
const userRoute = require('./routes/user');
const roleRoute = require('./routes/role');



//middlewares
app.use(express.json());
app.use(morgan('tiny'));

// routes
app.use('/store-api/v1', authRoute);
app.use('/store-api/v1/users', authenticationMiddleware, userRoute);
app.use('/store-api/v1/roles', authenticationMiddleware, roleRoute);
app.use('/store-api/v1/products', authenticationMiddleware, productRoute);


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



