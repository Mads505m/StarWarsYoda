const missingDetails = (req, res, next) => {
    const { name, role, planet, id} = req.body;
    if (req.method === 'POST' && req.originalUrl === '/characters') {
        if (!name || !role || !planet) {
            return res.status(400).json({ message: 'Alle detaljer skal udfyldes: navn, rolle, planet' });
        }
    }

    if (req.method === 'DELETE' && req.originalUrl.startsWith('/characters')) {
        if (!id) {
            return res.status(400).json({ message: 'ID må ikke være tomt.' });
        }
        fs.readF
    }
    next();
};


module.exports = missingDetails;