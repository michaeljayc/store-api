require('dotenv').config();
const connectToDB = require('./db/dbConnect');
const User = require('./models/user');
const Store = require('./models/store');
const Product = require('./models/product');
const Category = require('./models/category');
const { createUserService } = require('./services/user.service');
const usersJSON = require('./data-seed/user.json');

const start = async () => {
    try {
        await connectToDB(process.env.MONGO_URI);
        await User.deleteMany();
        await Store.deleteMany();
        await Product.deleteMany();
        await Category.deleteMany();
        await createUserService(usersJSON);
        console.log("Data seeding successful...");
        process.exit(0);
    } catch(err) {
        console.log(err);
    }
}


start();