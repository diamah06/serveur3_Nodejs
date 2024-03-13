
//const {isAdmin} = require('../models');
const router = express.Router();
// Importation du contrôleur isAdminController
const isAdminController = require('../controllers/isAdminController');

// Définition de la route qui nécessite une vérification d'administrateur
router.get('/admin-route', isAdmin, isAdminController.get);

// Exportation du routeur
module.exports = router;
