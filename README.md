# 🍬 Carambar API

## 🚀 Description

API REST pour gérer les blagues Carambar — réalisée avec **Node.js**, **Express**, **Sequelize** et **SQLite**.

## Liste des bibliothèques utilisées

- **Express** → framework web
- **Sequelize** → ORM pour la base de données
- **SQLite** → base de données légère
- **Swagger** → documentation de l'API
- **Nodemon** → redémarrage automatique du serveur en dev
- **cors** → gestion des CORS cross-origin-resource-sharing
- **ts-errors** → gestion des erreurs typées en TypeScript

## 📂 Structure du projet

- `models/` → modèles Sequelize
- `controllers/` → logique métier
- `routes/` → routes Express
- `config/` → configuration Sequelize
- `swagger/` → documentation API

## 🧭 Endpoints

- `GET /api/jokes` → liste des blagues
- `GET /api/jokes/:id` → une blague par ID
- `GET /api/random` → une blague aléatoire
- `POST /api/jokes` → ajouter une blague
- `DELETE /api/jokes/:id` → supprimer une blague

## 🧪 Tests

Tu peux tester avec **Postman** ou via Swagger :  
👉 [http://localhost:2525/api-docs](http://localhost:2525/api-docs)

## ⚙️ Installation

```bash
npm install
npm run dev
```
