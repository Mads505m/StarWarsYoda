const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
const characterRoutes = require('./Routes/CharacterRoutes');
const logRequest = require('./Middleware/LogRequest');
const UnexceptedError = require('./Middleware/UnexceptedError');
const Homeroutes = require('./Routes/Homeroutes');
require('dotenv').config({ path: '.env' });
const PORT = process.env.PORT || 3000;


app.use(morgan('dev'));

app.use(logRequest)

app.use(express.json());

app.use(express.static(path.join(__dirname,'Public')));

app.use('/', characterRoutes);
app.use('/', Homeroutes);


app.use(UnexceptedError)




app.listen(PORT, () => {
    console.log(`Lytter til port ${PORT}`)
})