const sequelize = require("./config/sdb");

(async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Connecté à MySQL local !");
    } catch (err) {
        console.error("❌ Erreur de connexion :", err);
    }
})();
