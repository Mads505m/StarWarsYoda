const fs = require('fs');
const path = require('path');
const characterFilePath = path.join(__dirname, '../Model/CharacterData.json');

const checkFileExists = (req, res, next) => {
    fs.access(characterFilePath, fs.constants.F_OK, (err) => {
        if(err){
            return res.status(404).json({ message: 'Character data file does not exist'});
        }
        next();
    });
};

module.exports = checkFileExists;