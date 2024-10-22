const CharacterModel = require('../Model/CharacterModel');

const missingDetails = (req, res, next) => {
    const { name, role, planet, id} = req.body;
    if (req.method === 'POST' && req.originalUrl === '/characters') {
        if (!name || !role || !planet) {
            return res.status(400).json({ message: 'Alle detaljer skal udfyldes: navn, rolle, planet for at oprette en karakter' });
        }
    }

    if (req.method === 'DELETE' && req.originalUrl.startsWith('/characters')) {
        if (!id) {
            return res.status(400).json({ message: 'ID må ikke være tomt.' });
        }
        const characters = CharacterModel.getCharactersFromFile();
        const exists = characters.some(character => character.id === parseInt(id, 10));

        if (!exists) {
            return res.status(404).json({ message: 'Karakteren med det angivne ID findes ikke.' });
        }
    }

    if (req.method === 'PUT' && req.originalUrl.startsWith('/characters')) {
        const { id } = req.params;
        const updatedCharacter = req.body;
        if (!updatedCharacter.name || !updatedCharacter.role || !updatedCharacter.planet) {
            return res.status(400).json({message: 'Alle detaljer skal udfyldes: navn, rolle, planet for at opdatere karakteren'});
        }

        const characterId = parseInt(id, 10);
        const result = CharacterModel.updateCharacterById(characterId, updatedCharacter);
        if (!result) {
            return res.status(404).json({message: 'Karakter ikke fundet, ID eksistere ikke'});
        }
    }
    next();
};

module.exports = missingDetails;