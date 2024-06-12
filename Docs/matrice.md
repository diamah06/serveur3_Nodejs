| Tâche                                                           | Validée | Lien                                             |
|-----------------------------------------------------------------|-----------|------------------------------------------------|
| Création des dossiers et fichiers Routes (User, Room, Spot...)  |    ✅     |                                                |
| Création des dossiers et fichiers Modèles (User, Room, Spot...) |    ✅     |                                                |
| Mise en place des contrôleurs (User, Room, Spot...)             |    ✅     |                                                |
| 🔜 Implémenter les services                                     |    ✅     |                                                |         |



Auth
|---------------------------------------------------------------------------------------------------------
Test ID	Scénario |	Méthode HTTP      |Endpoint	   | Description du test                                |

----------------------------------------------------------------------------------------------------------
1	Sign Up - Succès	POST	/signup	Créer un nouvel utilisateur avec des données valides
2	Sign Up - Email déjà utilisé	POST	/signup	Essayer de créer un utilisateur avec un email existant
3	Sign Up - Données invalides	POST	/signup	Essayer de créer un utilisateur avec des données invalides
4	Sign In - Succès	POST	/signin	Connecter un utilisateur avec des identifiants valides
5	Sign In - Mot de passe incorrect	POST	/signin	Essayer de connecter avec un mot de passe incorrect
6	Sign In - Utilisateur non trouvé	POST	/signin	Essayer de connecter avec un email non enregistré
7	Sign In - Données invalides	POST	/signin	Essayer de connecter avec des données invalides
8	Sign Up - Mot de passe faible	POST	/signup	Essayer de créer un utilisateur avec un mot de passe faible
9	Sign Up - Email invalide	POST	/signup	Essayer de créer un utilisateur avec un email invalide
10	Sign Up - Champ manquant	POST	/signup	Essayer de créer un utilisateur avec un champ manquant
