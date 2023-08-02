require('dotenv').config();
const connectToDB = require('./db/dbConnect');
const Product = require('./models/product');
const productsJSON = require('./products.json');

const start = async () => {
    try {
        await connectToDB(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.create(productsJSON);
        console.log("Data seeding successful...");
        process.exit(0);
    } catch(err) {
        console.log(err);
    }
}


start();