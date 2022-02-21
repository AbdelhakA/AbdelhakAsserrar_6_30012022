const express = require('express');
const router = express.Router();
const Sauce = require('../models/Sauce');

const sauceCtrl = require('../controllers/stuff'); // importe le contenu de controllers/stuff.js ici


router.post('/api/stuff', stuffCtrl.createSauce); // stuffCtrl.createThing fait référence à la logique métier qui se trouve dans controllers/stuff.js
  
    // ---------------- SUPPRIMER UN OBJET -------------------------------------
  
router.delete('/:id', stuffCtrl.deleteSauce);
  
    // -------- MODIFIER UN OBJET -----------------------------------------------
  
router.put('/:id', stuffCtrl.modifySauce);
  
   //--------------// requet GET pour UN SEUL THING de la database---------------
  
router.get('/:id', stuffCtrl.getOneSauce);
  
    //------------- requet GET pour toutes les Things de la database ------------
    
router.get('/', stuffCtrl.getAllSauces);

    
module.exports = router;