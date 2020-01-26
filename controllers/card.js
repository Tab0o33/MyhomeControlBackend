const Card = require('../models/card');
const jwt = require('jsonwebtoken');

const getUserIdWithTokken = (tokenHeader) => {
    const token = tokenHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    return decodedToken.userId;
}

exports.createCard = (req, res, next) => {
    const userId = getUserIdWithTokken(req.headers.authorization);
    const cardObject = JSON.parse(req.body.card);
    delete cardObject._id;
    const card = new Card({
        roomName: cardObject.roomName,
        userId: userId
    });
    card.save()
        .then(() => res.status(201).json({ message: 'Carte enregistré !' }))
        .catch(error => res.status(500).json({ error }));
};

exports.readAllCards = (req, res, next) => {
    const userId = getUserIdWithTokken(req.headers.authorization);
    Card.find({ userId: userId }).then(
        (cards) => {
            res.status(200).json(cards);
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error: error
            });
        }
    );
};

exports.readOneCard = (req, res, next) => {
    const userId = getUserIdWithTokken(req.headers.authorization);
    Card.findOne({
        _id: req.params.id,
        userId: userId
    }).then(
        (card) => {
            if (card !== null) {
                res.status(200).json(card);
            } else {
                res.status(403).json({
                    error: error
                });
            }
        }
    ).catch(
        (error) => {
            res.status(404).json({
                error: error
            });
        }
    );
};

exports.updateCard = (req, res, next) => {
    const userId = getUserIdWithTokken(req.headers.authorization);
    const cardObject = { ...req.body };
    Card.updateOne({ _id: req.params.id, userId: userId }, { ...cardObject, _id: req.params.id })
        .then((data) => {
            if (data.n > 0) {
                res.status(200).json({ message: 'Objet modifié !' });
            } else {
                res.status(403).json({ error });
            }
        })
        .catch(error => res.status(403).json({ error }));
};

exports.deleteCard = (req, res, next) => {
    const userId = getUserIdWithTokken(req.headers.authorization);
    Card.deleteOne({ _id: req.params.id, userId: userId })
        .then((data) => {
            if (data.n > 0) {
                res.status(200).json({ message: 'Objet supprimé !' });
            } else {
                res.status(403).json({ error });
            }
        })
        .catch(error => res.status(403).json({ error }));
};
