require('dotenv').config();

module.exports = {
    type: process.env.DB_TYPE,
    /* host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD, */
    url: process.env.MONGO_URI,
    useNewUrlParser: true,
    synchronize: true,
    logging: true,
    database: process.env.DB_DATABASE,
    entities: ['dist/entities/*.js'],
    useUnifiedTopology: true,
    // synchronize: false,
}