const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

let sequelize;

if (process.env.NODE_ENV === "production") {
    // PostgreSQL pour Render
    sequelize = new Sequelize(process.env.DATABASE_URL_EXT, {
        dialect: "postgres",
        dialectOptions: {
            ssl: { require: true, rejectUnauthorized: false },
        },
    });
} else if (process.env.NODE_ENV === "sqlite") {
    // SQLite en local
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: path.join(__dirname, "database.sqlite"),
        logging: false,
    });
} else {
    // MySQL en local
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            dialect: "mysql",
            logging: console.log, // pour voir les requêtes SQL
        }
    );
}

module.exports = sequelize;
