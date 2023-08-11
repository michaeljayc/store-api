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


//extra security packages
const helmet = require('helmet');
const cors = require('cors');
const limiter = require('express-rate-limit');
const xss = require('xss-clean');

//middlewares
app.set('trust proxy', 1);
app.use(limiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
}));
app.use(xss());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

// routes
app.get('/api/v1', (req,res) => res.send("Welcome to store-api"));
app.use('/api/v1', authRoute);
app.use('/api/v1/users', authenticationMiddleware, userRoute);
app.use('/api/v1/roles', authenticationMiddleware, roleRoute);
app.use('/api/v1/products', authenticationMiddleware, productRoute);

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



