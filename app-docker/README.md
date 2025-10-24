Portfolio Node App — Dockerized Node.js + PostgreSQL

Ce projet est une application Node.js connectée à une base de données PostgreSQL, entièrement conteneurisée avec Docker et orchestrée via Docker Compose.
Il inclut également une configuration pour exécuter automatiquement des tests unitaires et d’intégration à l’aide de Jest.

Architecture du projet:

app-docker/
├── src/
│   ├── index.js          # Point d'entrée de l'application Express
│   └── db.js             # Connexion et initialisation de la base PostgreSQL
│
├── tests/
│   ├── unit/             # Tests unitaires (fonctions isolées)
│   └── integration/      # Tests d’intégration (app + DB)
│
├── .env                  # Variables d'environnement (non versionnées)
├── Dockerfile            # Image Docker multi-étapes (build + runtime)
├── docker-compose.yml    # Orchestration multi-conteneurs
├── package.json          # Dépendances et scripts npm
├── .eslintrc.json        # Règles de style et qualité du code
├── .dockerignore         # Fichiers exclus du build Docker
└── README.md             # Documentation du projet

Pré-requis:

Docker et Docker Compose installés

Port 3000 (app) et 5432 (PostgreSQL) disponibles sur ta machine

(Optionnel) Node.js 18+ si tu veux lancer l’app sans Docker


Variables d’environnement:

Le fichier .env (non inclus dans GitHub) contient les variables utilisées par l’application et la base de données :

POSTGRES_DB=mydb
POSTGRES_USER=user
POSTGRES_PASSWORD=pass
DATABASE_URL=postgres://user:pass@db:5432/mydb
PORT=3000


Démarrage avec Docker Compose:

1️⃣ Construire et lancer tous les conteneurs
docker compose up --build

Cela va :

Démarrer une base de données PostgreSQL (db)

Construire et lancer l’application Node.js (app)

Exécuter les tests d’intégration (tests)

2️⃣ Vérifier les logs
docker compose logs -f

3️⃣ Accéder à l’application

Une fois lancée :

URL locale : http://localhost:3000

Endpoint de santé : http://localhost:3000/health


Tests automatisés:

➤ Lancer les tests unitaires (localement)
npm run test:unit

➤ Lancer les tests d’intégration (nécessite DB)
npm run test:int

➤ Lancer tous les tests
npm test


Lors du build Docker, les tests unitaires et d’intégration sont exécutés automatiquement.

Commandes utiles:
Commande	                    Description
docker compose up --build	    Lance l’application et la DB
docker compose down -v	      Stoppe les conteneurs et supprime les volumes
docker exec -it node_app sh	  Accède au shell du conteneur de l’app
docker logs node_app	        Consulte les logs de l’application

Technologies utilisées:
Outil	                    Rôle
Node.js	                  Exécution du code JavaScript côté serveur
Express.js	              Framework web minimaliste
PostgreSQL	              Base de données relationnelle
pg (node-postgres)	      Client PostgreSQL pour Node.js
Jest	                    Framework de test
Docker / Docker Compose	  Conteneurisation et orchestration
ESLint	                  Vérification de la qualité du code


Auteur:
René Tamwo
DevOps & Cloud Engineer
Basé à Paris, France
tamwotagne@gmail.com

Licence:
Projet librement réutilisable à des fins d’apprentissage.
© 2025 René Tamwo – Tous droits réservés.
