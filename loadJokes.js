const sequelize = require("./config/sdb");
const Joke = require("./models/jokeModel");

(async () => {
    try {
        await sequelize.sync({ force: false }); // crée la table si elle n'existe pas
        await Joke.bulkCreate([
            { question: " Que dit un oignon quand il se cogne ?", answer: "Aïe", author: "Carambar" },
            { question: "Quel est l'animal le plus heureux ?", answer: "Le hibou, parce que sa femme est chouette", author: "Carambar" },
            { question: "Pourquoi le football c'est rigolo ?", answer: "Parce que Thierry en rit", author: "Carambar" },
            { question: "Quel est le sport le plus fruité ?", answer: "La boxe,parce que tu te prends des pêches dans la poire et tu tombes dans les pommes.", author: "Carambar" },
            { question: "Que se fait un Schtroumpf quand il tombe ?", answer: "Un Bleu", author: "Carambar" },
            { question: "Quel est le comble pour un marin ?", answer: "Avoir le nez qui coule", author: "Carambar" },
            { question: "Qu'est ce que les enfants usent le plus à l'école ?", answer: "Le professeur", author: "Carambar" },
            { question: "Quel est le sport le plus silencieux ?", answer: "Le para-chuuuut", author: "Carambar" },
            { question: "Quel est le comble pour un joueur de bowling ?", answer: "C’est de perdre la boule", author: "Carambar" }

        ]);
        console.log("✅ Blagues insérées dans la DB !");
        process.exit(0); // quitte le script
    } catch (err) {
        console.error("❌ Erreur :", err);
        process.exit(1);
    }
})();