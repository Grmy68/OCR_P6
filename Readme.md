<h1>Construire une API sécurisée pour une application d'avis gastronomiques</h1>
<b>Projet 6 de la formation Développeur Web - OpenClassrooms ↓</b><br><br><br>


<div style="text-align:center"><img src="frontend/src/assets/images/piiquante-logo.png" alt="Logo Piiquante" width="600"/></div><br>

<em><u>Lien vers le repo github du projet</u></em><br>
https://github.com/Grmy68/OCR_P6


<em>Création de l'API pour l'application web Piiquante</em>

<h2><u>Le brief</u></h2>

<h3>Contexte du projet:</h3>
Piiquante se dédie à la création de sauces épicées dont les recettes sont gardées
secrètes. Pour tirer parti de son succès et générer davantage de buzz, l'entreprise
souhaite créer une application web dans laquelle les utilisateurs peuvent ajouter
leurs sauces préférées et liker ou disliker les sauces ajoutées par les autres.


<h3>Exigences de sécurité:</h3>
• Le mot de passe de l'utilisateur doit être haché.<br>
• L'authentification doit être renforcée sur toutes les routes sauce requises.<br>
• Les adresses électroniques dans la base de données sont uniques et un
  plugin Mongoose approprié est utilisé pour garantir leur unicité et signaler
  les erreurs.<br>
• La sécurité de la base de données MongoDB (à partir d'un service tel que
  MongoDB Atlas) ne doit pas empêcher l'application de se lancer sur la
  machine d'un utilisateur.<br>
• Un plugin Mongoose doit assurer la remontée des erreurs issues de la base
  de données.<br>
• Les versions les plus récentes des logiciels sont utilisées avec des correctifs
  de sécurité actualisés.<br>
• Le contenu du dossier images ne doit pas être téléchargé sur GitHub.<br>


<h2><u>Utilisation du projet</u></h2>

<h3>Connexion à MongoDB:</h3>
Sur le cloud de MondoDB, créer un nouveau projet. Pour ce dernier créer également un Cluster, créer un utilisateur d'accès  ainsi que les droits d'accès IP (0.0.0.0 pour un accès depuis n'importe quel poste) puis copier le lien mongodb+srv:// d'affiliation.
Dans le fichier .env du code, coller l'entièreté du lien à la variable <em>URL_DB_CONNECT</em>. La ligne devrait ressembler à ceci:<br> <em>URL_DB_CONNECT = mongodb+srv://idCluster:passwordCluster@p6oc.1jn1loe.mongodb.net/?retryWrites=true&w=majority</em> <br> Remplacer les parties <div style="color:yellow">idCluster</div> et passwordCluster par les identifiants créés précédemment.


<h3>Démarrage du frontend:</h3>
Depuis le code, ouvrir un nouveau terminal, se rendre dans le dossier frontend avec <em>cd frontend</em> puis lancer le ng serve avec la commande <em>npm start</em> enregistrée dans le fichier package.json du frontend <br>
Attendre la confirmation du terminal →<br>
✔ Compiled successfully.<br>
✔ Browser application bundle generation complete.<br><br>
La partie frontend de l'application est maintenant démarrée

<h3>Démarrage du backend:</h3>
Depuis le code, ouvrir un nouveau terminal, se rendre dans le dossier backend avec <em>cd backend</em> puis lancer le nodemon server avec la commande <em>npm start</em> enregistrée dans le fichier package.json du backend <br>
Attendre la confirmation du terminal →<br>
[nodemon] starting `node server.js`<br>
Listening on port 3000<br>
Connexion à MongoDB réussie !<br><br>
Si les identifiants son corrects et qu'aucune erreur n'est à déclarer la partie frontend de l'application est maintenant démarrée !

<h3>Accéder à l'application web:</h3>
Pour utiliser l'application ouvrir ce lien depuis un navigateur → http://localhost:4200/signup afin de pouvoir créer un compte et commencer l'utilisation de l'application.


<h2><u>Conclusion</u></h2>
• L'utilisateur peut créer un compte avec une adresse mail unique et y est automatiquement connecté<br>
• L'utilisateur peut se connecter à son compte créé au préalable<br>
• Le token de connexion expire au bout de 24 heures et utilise JsonWebToken<br>
• Le mot de passe est hashé 10 fois et utilise Bcrypt<br>
• Le code est protéger contre les injection grâce à la méthode CORS<br>
• L'utilisateur peut créer une ou plusieurs sauce(s) en complétant le formulaire entièrement<br>
• Si l'image est manquante, le frontend n'autorise pas la publication<br>
• Si un utilisateur arrive à valider le formulaire sans insérer d'image, l'application retourne error 401 Unauthorized et non  500 Internal Server (testé avec Postman)<br>
• L'utilisateur peut modifier ses propres publications (titre, description, image...etc) et non celles des autres<br>
• Les utilisateurs peuvent "liker" ou "disliker" leurs propres sauces ainsi que celles des autres<br>
• Les utilisateurs peuvent voir l'ensemble des publications<br>
• Le fichier dotenv masque le type de token et l'adresse de la DB<br>







