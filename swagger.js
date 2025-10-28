const express = require('express');
const router = express.Router();
const {
    getAllJokes,
    getJokeById,
    addOneJoke,
    getRandomJoke,
    deleteJoke
} = require("../controllers/jokeController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Joke:
 *       type: object
 *       required:
 *         - question
 *         - answer
 *       properties:
 *         id:
 *           type: string
 *           description: The joke ID
 *         question:
 *           type: string
 *           description: The joke question
 *         answer:
 *           type: string
 *           description: The joke answer
 *         author:
 *           type: string
 *           description: The author of the joke
 */

/**
 * @swagger
 * /api/jokes:
 *   get:
 *     summary: Get all jokes
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         description: List of all jokes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Joke'
 */
router.get('/', getAllJokes);

/**
 * @swagger
 * /api/jokes:
 *   post:
 *     summary: Add a new joke
 *     tags: [Jokes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Joke'
 *     responses:
 *       201:
 *         description: Joke created successfully
 */
router.post('/', addOneJoke);

/**
 * @swagger
 * /api/jokes/{id}:
 *   get:
 *     summary: Get a joke by ID
 *     tags: [Jokes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Joke details
 *       404:
 *         description: Joke not found
 */
router.get('/:id', getJokeById);

/**
 * @swagger
 * /api/jokes/{id}:
 *   delete:
 *     summary: Delete a joke by ID
 *     tags: [Jokes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Joke deleted successfully
 */
router.delete('/:id', deleteJoke);

/**
 * @swagger
 * /api/jokes/random:
 *   get:
 *     summary: Get a random joke
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         description: A random joke
 */
router.get('/random', getRandomJoke);

module.exports = router;
