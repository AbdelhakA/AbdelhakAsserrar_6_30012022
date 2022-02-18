const User = require('../models/User');
const bcrypt = require('bcrypt');


exports.signup = (req, res, next) => {
 bcrypt.hash(req.body.password, 10)
    .then(hash =>{
        const user = new User({
            email: req.body.email, // adresse fourni dans le corps de la requête
            password: hash
        });
        user.save() // save le nouveau user avec MDP crypté dans la base de données
            .then(() => res.status(201).json({message: 'Utilisateur créé !'}))
            .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if(!user) { // si utilisateur non trouvétrouvable
                return res.status(401).json({ message: 'Utilisateur non trouvé' });
            }
            bcrypt.compare(req.body.password, user.password) // bcrypt compare le mot de passe envoyé avec celuis stocké dans la base de données
            .then(valid => {
                if(!valid) {
                return res.status(401).json({ message: 'Mot de passe incorrect' });    
                }
                res.status(201).json({  
                    userId: user._id, // la base de données renvoie un userId généré par elle
                    token: 'TOKEN' // ainsi qu'un Token
                })
            })
            .catch(error => res.status(500).json({ error }))

        })
        .catch(error => res.status(500).json({ error }));
};

module.exports 