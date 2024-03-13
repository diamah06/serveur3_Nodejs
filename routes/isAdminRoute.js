
//const {isAdmin} = require('../models');
const router = express.Router();
// Importation du contrôleur isAdminController
const isAdmin = require('../controllers/isAdminController');

// Définition de la route qui nécessite une vérification d'administrateur
router.get('/admin-route', isAdmin, (req, res) => {
  // Si l'utilisateur est un administrateur, cette fonction sera exécutée
  res.send('Bienvenue sur la route d\'administration !');
});

// Exportation du routeur
module.exports = router;
