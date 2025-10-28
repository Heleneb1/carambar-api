const Joke = require("../models/jokeModel");
const { NotFoundError, CustomError } = require("@heleneb1/ts-errors");

// Get all jokes
const getAllJokes = async (req, res) => {
    try {
        const jokes = await Joke.findAll();
        res.status(200).json(jokes);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

// Get joke by ID
const getJokeById = async (req, res) => {
    const { id } = req.params;
    try {
        const joke = await Joke.findByPk(id);
        if (!joke) {
            const err = NotFoundError("Joke not found", details = ("Joke with ID " + id + " does not exist"));
            err.log();
            return res.status(err.statusCode).json({
                emoji: err.emoji,
                message: err.message,
                status: err.statusCode,
                category: err.category,
                details: err.details
            });
        }
        res.status(200).json(joke);
    } catch (err) {
        if (err instanceof CustomError) {

            err.log();
        }
        console.error(err);
        res.sendStatus(500);
    }
}

// Add one joke
const addOneJoke = async (req, res) => {
    try {
        const { question, answer, author } = req.body;
        const newJoke = await Joke.create({ question, answer, author });
        res.status(201).send(newJoke);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};
// Delete joke by ID
const deleteJoke = async (req, res) => {
    const { id } = req.params;
    try {
        const joke = await Joke.findByPk(id);
        if (!joke) {
            return res.status(404).json({ error: "Joke not found" });
        }
        await joke.destroy();
        res.status(200).json({ message: "Joke deleted successfully" });
    }
    catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};
// Get random joke
const getRandomJoke = async (req, res) => {
    try {
        const jokes = await Joke.findAll();
        if (jokes.length === 0) {
            return res.status(404).json({ error: "No jokes available" });
        }
        const randomIndex = Math.floor(Math.random() * jokes.length);
        const randomJoke = jokes[randomIndex];
        res.status(200).json(randomJoke);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};


module.exports = {
    getAllJokes,
    getJokeById,
    addOneJoke,
    deleteJoke,
    getRandomJoke
};