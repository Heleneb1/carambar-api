const { where } = require("sequelize");
const Joke = require("../models/jokeModel");
const { CustomError, NotFoundError } = require("@heleneb1/ts-errors")
// Get all jokes
const getAllJokes = async (req, res, next) => {
    try {
        const jokes = await Joke.findAll({ where: { published: true } });
        res.status(200).json(jokes);
    } catch (err) {
        next(err); // passe l’erreur au middleware global
    }

};

//Here
const getJokeById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const joke = await Joke.findByPk(id);
        if (!joke) {
            throw CustomError({
                message: "Joke not found",
                statusCode: 404,
                details: { jokeId: id },
            });
        }
        res.status(200).json(joke);

    } catch (err) {
        next(err);
    }
};

// Add one joke
const addOneJoke = async (req, res, next) => {
    try {
        const { question, answer, author } = req.body;
        const newJoke = await Joke.create({ question, answer, author });
        res.status(201).send(newJoke);
    } catch (err) {
        next(err); // passe l’erreur au middleware global
    }

};
// Delete joke by ID
const deleteJoke = async (req, res, next) => {
    const { id } = req.params;
    try {
        const joke = await Joke.findByPk(id);
        if (!joke) {
            throw NotFoundError(
                `Joke with this Id ${id}, doesn't exist 😔`,
                { id } // details en tant qu'objet
            );
        }

        await joke.destroy();
        res.status(200).json({ message: "Joke deleted successfully" });
    } catch (err) {
        next(err); // passe l’erreur au middleware global
    }

};
// Update Joke
const updateJoke = async (req, res, next) => {
    const { id } = req.params;
    const { question, answer, author, published } = req.body;

    try {
        const joke = await Joke.findByPk(id);

        if (!joke) {
            const err = NotFoundError(
                "Joke not found",
                `Joke with ID ${id} does not exist`
            );
            throw err;
        }

        // Met à jour seulement les champs envoyés
        joke.question = question ?? joke.question;
        joke.answer = answer ?? joke.answer;
        joke.author = author ?? joke.author;
        joke.published = published ?? joke.published;

        await joke.save();

        res.status(200).json({
            message: "Joke updated successfully",
            joke,
        });
    } catch (err) {
        next(err);
    }
};
// Variable pour stocker la dernière blague renvoyée
let lastJokeId = null;

const getRandomJoke = async (req, res, next) => {
    try {
        const count = await Joke.count();

        if (count === 0) {
            return res.status(404).json({ error: "No jokes available" });
        }

        let randomIndex = Math.floor(Math.random() * count);// renvoie l'index de la blague donc un numero
        let randomJoke = await Joke.findOne({ offset: randomIndex });


        if (randomJoke.id === lastJokeId && count > 1) { // Si la blague tirée a le même ID que la dernière
            randomIndex = Math.floor(Math.random() * count); //on refait un tirage
            randomJoke = await Joke.findOne({ offset: randomIndex });// saute de randomIndex ligne, et donne la suivante
        }

        lastJokeId = randomJoke.id; //on stoke l'id pour la prochaine requête

        res.status(200).json(randomJoke);

    } catch (err) {
        next(err); // passe l’erreur au middleware global
    }
};

module.exports = {
    getAllJokes,
    getJokeById,
    addOneJoke,
    updateJoke,
    deleteJoke,
    getRandomJoke
};