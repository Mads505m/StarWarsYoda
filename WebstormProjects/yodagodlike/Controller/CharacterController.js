const express = require('express');
const path = require('path');
const CharacterModel = require('../Model/CharacterModel');



const getAllCharacters = (req, res) => {
    const characters = CharacterModel.getCharactersFromFile();
    res.json(characters);
};


const addCharacter = (req, res) => {
    const { name, role, planet } = req.body;
    const newCharacter = { name, role, planet };
    const addedCharacter = CharacterModel.addCharacter(newCharacter);
    return res.status(201).json(addedCharacter);
};


const updateCharacter = (req, res) => {
    const { id } = req.params;
    const updatedCharacter = req.body;
    if (!updatedCharacter.name || !updatedCharacter.role || !updatedCharacter.planet) {
        return res.status(400).json({ message: 'Alle detaljer skal udfyldes' });
    }
    const characterId = parseInt(id, 10);
    const result = CharacterModel.updateCharacterById(characterId, updatedCharacter);

    if (result) {
        return res.json(result);
    } else {
        return res.status(404).json({ message: 'Karakter ikke fundet' });
    }
};


const deleteCharactersFromFile = (req, res) => {
    const { id } = req.body;
    const characterId = parseInt(id, 10);
    CharacterModel.deleteCharacterById(characterId);
    res.status(204).send();
};



module.exports = {
    getAllCharacters,
    addCharacter,
    updateCharacter,
    deleteCharactersFromFile
};
