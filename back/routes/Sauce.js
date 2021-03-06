const express = require('express');
const router = express.Router();
const Sauce = require('../models/Sauce');

const sauceCtrl = require('../controllers/Sauce'); // importe le contenu de controllers/stuff.js ici
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, sauceCtrl.createSauce); // stuffCtrl.createThing fait référence à la logique métier qui se trouve dans controllers/stuff.js
  
    // ---------------- SUPPRIMER UN OBJET -------------------------------------
  
router.delete('/:id', auth, sauceCtrl.deleteSauce);
  
    // -------- MODIFIER UN OBJET -----------------------------------------------
  
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
  
   //--------------// requet GET pour UNE SEULE SAUCE de la database---------------
  
router.get('/:id', auth, sauceCtrl.getOneSauce);
  
    //------------- requet GET pour TOUTES LES SAUCES de la database ------------
    
router.get('/', auth, sauceCtrl.getAllSauces);



router.post('/:id/like', auth, sauceCtrl.likes);

    
module.exports = router;