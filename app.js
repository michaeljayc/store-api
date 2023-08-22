// creating express server
const express = require('express');
const app = express();

// packages
require('dotenv').config();
require('express-async-errors');
const morgan = require('morgan'); 
const cookieParser = require('cookie-parser');

// database 
const connectToDB = require('./db/dbConnect');

// custom middlewares
const notFoundMiddleware = require('./middlewares/notFound');
const { errorHandlerMiddleware } = require('./middlewares/error-handler');

// routes
const productRoute = require('./routes/product');
const authRoute = require("./routes/auth");
const userRoute = require('./routes/user');
const storeRoute = require('./routes/store');
const categoryRoute = require('./routes/category');

//extra security packages
const helmet = require('helmet');
const cors = require('cors');
const limiter = require('express-rate-limit');
const xss = require('xss-clean');

// swagger
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

// using packages
app.set('trust proxy', 1);
app.use(limiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
}));
app.use(xss());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser(process.env.SECRET_TOKEN));
app.use(morgan('tiny'));

// swagger documentation
app.get('/', (req,res) => {
    res.send(
        `<div>
            <div>
                <h1>Welcome to Store API version 1!</h1>
                <h4>This is an API service created by <b>Michael Jay Caballeor</b>
                    using Javascript, Node.JS, Express and MongoDB. 
                </h4>
                <p>Please be patient if some documentations or routes are not updated
                since constant updates are being made to this API. Thank you! </p>
            </div>
            <ul>
                <li> <a href='/api-docs'>Documentation Link</a></li>
            </ul>
        </div>`
    );
});
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// routing uri's
app.use('/api/v1', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/products', productRoute);
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/stores', storeRoute);

// using custom middlewares
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



