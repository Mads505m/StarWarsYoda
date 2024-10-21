const unexceptedError = (err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).send('Something broke');
}
module.exports = unexceptedError;