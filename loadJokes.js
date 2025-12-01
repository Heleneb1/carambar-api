/*const axios = require("axios");
// const sequelize = require("./config/sdb");
const Joke = require("./models/jokeModel");

const jokes = [
    { question: " Que dit un oignon quand il se cogne ?", answer: "Aïe", author: "Carambar", published: true },
    { question: "Quel est l'animal le plus heureux ?", answer: "Le hibou, parce que sa femme est chouette", author: "Carambar" , published: true},
    { question: "Pourquoi le football c'est rigolo ?", answer: "Parce que Thierry en rit", author: "Carambar", published: true },
    { question: "Quel est le sport le plus fruité ?", answer: "La boxe,parce que tu te prends des pêches dans la poire et tu tombes dans les pommes.", author: "Carambar", published: true },
    { question: "Que se fait un Schtroumpf quand il tombe ?", answer: "Un Bleu", author: "Carambar" , published: true},
    { question: "Quel est le comble pour un marin ?", answer: "Avoir le nez qui coule", author: "Carambar", published: true },
    { question: "Qu'est ce que les enfants usent le plus à l'école ?", answer: "Le professeur", author: "Carambar", published: true },
    { question: "Quel est le sport le plus silencieux ?", answer: "Le para-chuuuut", author: "Carambar", published: true },
    { question: "Quel est le comble pour un joueur de bowling ?", answer: "C’est de perdre la boule", author: "Carambar", published: true }

];
(async () => {
    try {
        for (const joke of jokes) {
            await axios.post("https://carambar-api-khpl.onrender.com/api/v1/jokes", joke,
                { headers: { "Content-Type": "application/json" } })
        }
        console.log("✅ Blagues insérées dans la DB !");

    } catch (err) {
        console.error("❌ Erreur :", err);

    }
})();*/
const axios = require("axios");
const sequelize = require("./config/sdb");
const Joke = require("./models/jokeModel");

(async () => {
    try {
        await Joke.destroy({ where: {} });
        await sequelize.sync({ force: false }); //true crée la table si elle n'existe pas
        await Joke.bulkCreate([
            { question: " Que dit un oignon quand il se cogne ?", answer: "Aïe", author: "Carambar", published: true },
            { question: "Quel est l'animal le plus heureux ?", answer: "Le hibou, parce que sa femme est chouette", author: "Carambar", published: true },
            { question: "Pourquoi le football c'est rigolo ?", answer: "Parce que Thierry en rit", author: "Carambar", published: true },
            { question: "Quel est le sport le plus fruité ?", answer: "La boxe,parce que tu te prends des pêches dans la poire et tu tombes dans les pommes.", author: "Carambar", published: true },
            { question: "Que se fait un Schtroumpf quand il tombe ?", answer: "Un Bleu", author: "Carambar", published: true },
            { question: "Quel est le comble pour un marin ?", answer: "Avoir le nez qui coule", author: "Carambar", published: true },
            { question: "Qu'est ce que les enfants usent le plus à l'école ?", answer: "Le professeur", author: "Carambar", published: true },
            { question: "Quel est le sport le plus silencieux ?", answer: "Le para-chuuuut", author: "Carambar", published: true },
            { question: "Quel est le comble pour un joueur de bowling ?", answer: "C’est de perdre la boule", author: "Carambar", published: true }

        ]);
        console.log("✅ Blagues insérées dans la DB !");
        process.exit(0); // quitte le script
    } catch (err) {
        console.error("❌ Erreur :", err);
        process.exit(1);
    }
})();