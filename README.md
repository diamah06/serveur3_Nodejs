Projet serveur Node.js

Ce repo GitHub contient le code source d'un projet serveur Node.js pour la réservation de restaurant. Le projet implémente un système simple d'authentification et d'enregistrement d'utilisateurs.

Installation
Pour installer le projet, vous devez suivre les étapes suivantes :

Cloner le repo GitHub :
git clone https://github.com/[votre nom d'utilisateur]/[nom du repo].git

2. Installer les dépendances :

npm install

3. Lancer le projet :

npm start

4. Utilisation:

Le projet s'exécute sur le port 3000 par défaut. Vous pouvez accéder au projet à l'adresse http://localhost:3000.

5. Express:

Le projet utilise Express pour créer un serveur . Pour installer Express, vous pouvez utiliser la commande suivante :
npm install express

6. Intégration d'une base de données
   Le projet utilise une base de données SQLite pour stocker les données.

Pour initialiser la base de données, nous avons utilisé la commande suivante :

npx sequelize-cli init
Cette commande crée un dossier database contenant les fichiers de configuration de la base de données.

7. Informations sur la commande npx sequelize-cli init :

La commande npx sequelize-cli init  initialise un nouveau projet Sequelize. Elle crée un dossier pour le projet et y ajoute les fichiers suivants :

package.json : un fichier qui spécifie les dépendances du projet

.sequelizerc : un fichier de configuration pour Sequelize

models : un dossier qui contient les modèles de données

migrations : un dossier qui contient les migrations de données

seeds : un dossier qui contient les données initiales

8. Utilisation de TablePlus:
   Pour gérer la base de données SQLite du projet, nous avons utilisé TablePlus. TablePlus est un outil de gestion de bases de données graphique qui permet de créer, de modifier et de gérer des bases de données SQLite.

9. Mise en place d'un système d'authentification:
   Le projet implémente un système d'authentification simple basé sur le hachage de mot de passe et les jetons JWT.

10. Tests et TDD:
    Le projet utilise Jest pour effectuer des tests unitaires et d'intégration. Les tests sont situés dans le dossier **tests**.

TabePlus:

<img width="967" alt="Capture d’écran 2023-10-26 à 17 16 25" src="https://github.com/diamah06/seveur2-Nodejs/assets/114236929/7615f0c6-a0b0-4f0d-b7d2-57e322c58d86">

Postman:

<img width="1440" alt="Capture d’écran 2023-10-26 à 17 43 14" src="https://github.com/diamah06/seveur2-Nodejs/assets/114236929/d4072f42-d0fc-4d42-91cc-9cbece6f0729">

<img width="1438" alt="Capture d’écran 2023-10-26 à 17 44 00" src="https://github.com/diamah06/seveur2-Nodejs/assets/114236929/f63d64c1-6682-410d-b262-b2156ead9d6b">

Schema Base de données :

<img width="991" alt="Capture d’écran 2024-04-09 à 15 26 14" src="https://github.com/diamah06/serveur3_Nodejs/assets/114236929/3d0db5cf-b709-40d4-b57f-bcf7ee294a7e">
