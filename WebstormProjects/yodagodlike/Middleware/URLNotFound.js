const notfound = (req, res, next) => {
    const currentTime = new Date().toISOString();
    console.error(`[${currentTime}] ${req.method} ${req.url} not found`);
    res.status(404).send('This URL does not exist');
}

module.exports = notfound;