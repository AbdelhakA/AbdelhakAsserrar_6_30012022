const Sauce = require('..models/Sauce');

exports.createSauce = (req, res, next) => { // Methode POST
    delete req.body._id; 
    const sauce = new Sauce({
       ...req.body.sauce
     });
     sauce.save()
     .then(() => res.status(201).json({ message: "objet enregistré !"}))
     .catch(error => res.status(400).json({ error }));
    };

exports.deleteSauce = (req, res, next) => { // Methode DELETE
    Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "objet supprimé !" }))
    .catch(error => res.status(400).json({ error }));
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