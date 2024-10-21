const express = require('express');
const path = require('path');
const router = express.Router();
const CharacterController = require('../Controller/CharacterController');
const logRequest = require('../Middleware/LogRequest');
const missingDetails = require('../middleware/missingDetails');
const checkFileExists = require('../Middleware/FileNotExisting');

router.get('/characters', checkFileExists, logRequest, CharacterController.getAllCharacters);

router.post('/characters', checkFileExists, missingDetails, logRequest, CharacterController.addCharacter);

router.put('/characters/:id', checkFileExists, missingDetails, logRequest, CharacterController.updateCharacter);

router.delete('/characters', checkFileExists, missingDetails, logRequest, CharacterController.deleteCharactersFromFile);


module.exports = router;