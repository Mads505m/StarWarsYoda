const express = require('express');
const path = require('path');
const router = express.Router();
const CharacterController = require('../Controller/CharacterController');
const logRequest = require('../Middleware/LogRequest');
const missingDetails = require('../middleware/missingDetails');


router.get('/characters', logRequest, CharacterController.getAllCharacters);

router.post('/characters', missingDetails, logRequest, CharacterController.addCharacter);

router.put('/characters/:id', missingDetails, logRequest, CharacterController.updateCharacter);

router.delete('/characters', missingDetails, logRequest, CharacterController.deleteCharactersFromFile);


module.exports = router;