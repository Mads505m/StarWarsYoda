const fs = require('fs');
const path = require('path');
const charactersFilePath = path.join(__dirname, 'CharacterData.json');


const getCharactersFromFile = () => {
    const data = fs.readFileSync(charactersFilePath, 'utf8');
    return JSON.parse(data);
};

const saveCharactersToFile = (characters) => {
    fs.writeFileSync(charactersFilePath, JSON.stringify(characters, null, 2), 'utf8');
};


const addCharacter = (newCharacter) => {
    const characters = getCharactersFromFile();
    const maxId = characters.reduce((max, character) => Math.max(max, character.id), 0);

    newCharacter.id = maxId + 1;

    const characterWithIdFirst = {
        id: newCharacter.id,
        name: newCharacter.name,
        role: newCharacter.role,
        planet: newCharacter.planet
    };

    characters.push(characterWithIdFirst);
    saveCharactersToFile(characters);
    return characterWithIdFirst;
};

const updateCharacterById = (id, updatedCharacter) => {
    const characters = getCharactersFromFile();
    const characterIndex = characters.findIndex(character => character.id === id);

    if (characterIndex === -1) {
        return null;
    }

    const updatedCharacterWithId = {
        id,
        ...updatedCharacter
    };

    characters[characterIndex] = updatedCharacterWithId;
    saveCharactersToFile(characters);
    return updatedCharacterWithId;
};


const deleteCharacterById = (id) => {
    const characters = getCharactersFromFile();
    const updatedCharacters = characters.filter(character => character.id !== id);

    saveCharactersToFile(updatedCharacters);
};


module.exports = {
    getCharactersFromFile,
    addCharacter,
    saveCharactersToFile,
    deleteCharacterById,
    updateCharacterById
};
