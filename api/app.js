
require('dotenv').config();
const express = require('express');
const logger = require('morgan');
require('./configs/db.config');
const app = express();

// Middlewares

app.use(express.json());
app.use(logger('dev'));

//Router

const router = require('./configs/routes.config')
app.use('/api/v1', router)

// error handlers

app.use((req, res, next) => {
    res.status(404).json({message: 'Route not found'})
})
app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({message: 'Internal server error'})
})

const port = process.env.PORT || 3000
app.listen(port, () => console.info(`App running at port ${port}`))