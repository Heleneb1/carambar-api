const express = require("express");
const app = express();
const sequelize = require("./config/sdb");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const dotenv = require("dotenv");
const { CustomError, errorMiddleware } = require("@heleneb1/ts-errors");

dotenv.config();
const port = process.env.PORT || 3000;
const jokeRoutes = require("./routes/jokeRoutes");

app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
    res.send("Bienvenue sur l'API Carambar 😋");
});
app.get("/test-error", (req, res, next) => {
    next(CustomError("Route de test d'erreur", { route: "/test-error" }));
});
app.use("/api/v1", jokeRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Carambar Joke API',
            version: '1.0.0',
            description: 'API to get and add jokes for Carambar & co.'
        },
        servers: [
            { url: `https://carambar-api-khpl.onrender.com/api/v1/` },
            { url: `http://localhost:${port}/api/v1` }
        ]
    },
    apis: ['./routes/*.js']
})));

// Middleware d’erreur de ta lib (en dernier)
app.use(errorMiddleware);

// Sync db et start server
(async () => {
    try {
        await sequelize.sync({ force: false });
        console.log("✅ Table Joke synchronisée");
        app.listen(port, () => {
            console.log(`🚀 Serveur démarré sur http://localhost:${port}`);
            console.log(`📚 Documentation API disponible sur http://localhost:${port}/api-docs`);
        });
    } catch (err) {
        console.error("❌ Erreur lors de la synchronisation :", err);
    }
})();
