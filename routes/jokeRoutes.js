const express = require('express');
const router = express.Router();
const { getAllJokes, getJokeById, addOneJoke, getRandomJoke, deleteJoke } = require("../controllers/jokeController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Joke:
 *       type: object
 *       required:
 *         - question
 *         - answer
 *         - author
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
 */

/**
 * @swagger
 * /jokes:
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
router.get('/jokes', getAllJokes);

/**
 * @swagger
 * /jokes:
 *   post:
 *     summary: Add a new joke
 *     tags: [Jokes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *               - answer
 *               - author
 *             properties:
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *               author:
 *                  type: string
 *     responses:
 *       201:
 *         description: Joke created successfully
 *       400:
 *         description: Invalid input
 */
router.post('/jokes', addOneJoke);

/**
 * @swagger
 * /joke/{id}:
 *   get:
 *     summary: Get a joke by ID
 *     tags: [Jokes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The joke ID
 *     responses:
 *       200:
 *         description: Joke details
 *       404:
 *         description: Joke not found
 *       500:
 *         description: Server error
 * 
 */
router.get('/joke/:id', getJokeById);

/**
 * @swagger
 * /joke/{id}:
 *   delete:
 *     summary: Delete a joke by ID
 *     tags: [Jokes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The joke ID
 *     responses:
 *       200:
 *         description: Joke deleted successfully
 *       404:
 *         description: Joke not found
 */
router.delete('/joke/:id', deleteJoke);

/**
 * @swagger
 * /random:
 *   get:
 *     summary: Get a random joke
 *     tags: [Jokes]
 *     responses:
 *       200:
 *         description: A random joke
 */
router.get('/random', getRandomJoke);

module.exports = router;