const Measure = require('../models/measure');
const jwt = require('jsonwebtoken');

const getUserIdWithTokken = (tokenHeader) => {
    const token = tokenHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    return decodedToken.userId;
}

exports.createMeasure = (req, res, next) => {
    const userId = getUserIdWithTokken(req.headers.authorization);
    const measureObject = JSON.parse(req.body.measure);
    delete measureObject._id;
    const measure = new Measure({
        measureDate: Date.now(),
        temperature: measureObject.temperature,
        pressure: measureObject.pressure,
        humidity: measureObject.humidity,
        luminosity: measureObject.luminosity,
        movement: measureObject.movement,
        cardId: measureObject.cardId
    });
    measure.save()
        .then(() => res.status(201).json({ message: 'Mesure enregistré !' }))
        .catch(error => res.status(500).json({ error }));
};
