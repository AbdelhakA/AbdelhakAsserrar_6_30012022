const Sauce = require('..models/Sauce');

exports.createSauce = (req, res, next) => { // Methode POST
  const sauceObject = JSON.parse(req.body.sauce);  
  delete sauceObject._id; 
    const sauce = new Sauce({
       ...sauceObject,
       imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // composition de l'URL de l'image
     });
     sauce.save()
     .then(() => res.status(201).json({ message: "objet enregistré !"}))
     .catch(error => res.status(400).json({ error }));
    };

    exports.deleteSauce = (req, res, next) => {
      Sauce.findOne({ _id: req.params.id}).then(
        (sauce) => {
          if(!sauce) { // Si l'objet n'existe pas
            req.status(404).json({
              error: new Error('Objet non trouvé !')
            });
          }
          if (sauce.userId !== req.auth.userId) {
            return res.status(401).json ({
              error: new Error('Requête non autorisée !')
            });
          }
          Sauce.deleteOne({ _id: req.params.id }) // verif si l'_id de la base de données = celui des paaramètres de la request
      .then(() => res.status(200).json({ message: "objet supprimé !" }))
      .catch(error => res.status(400).json({ error }));
        }
      )
      
    };

exports.modifySauce = (req, res, next) => { // Methode PUT
    Sauce.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "objet modifié !" }))
    .catch(error => res.status(400).json({ error }));
  };

exports.getOneSauce = (req, res, next) => { // Methode GET
    Sauce.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
  };
  
exports.getAllSauces = (req, res, next) => { // Methode GET
    Sauce.find()
    .then(things => res.status(200).json(sauces))
    .catch(error =>res.status(400).json({ error }));    
  }; 