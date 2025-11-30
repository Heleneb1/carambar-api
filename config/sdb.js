const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

let sequelize;

// ✅ Production sur Render → SQLite
if (process.env.NODE_ENV === "production") {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: path.join(process.cwd(), "carambar.sqlite"),
        logging: false,
    });

    // ✅ Mode SQLite local
} else if (process.env.NODE_ENV === "sqlite") {
    sequelize = new Sequelize({
        dialect: "sqlite",
        storage: path.join(__dirname, "database.sqlite"),
        logging: false,
    });

    // ✅ Mode MySQL local
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            dialect: "mysql",
            logging: console.log,
        }
    );
}

module.exports = sequelize;