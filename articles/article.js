const article_router = require('express').Router;

article_router.get('/', (req, res) => {
    res.send('asrticels');
})

module.exports = article_router;