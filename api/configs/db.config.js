const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurantsweb'

mongoose.connect(MONGODB_URI)
    .then(() => console.info('Succesfully connected to the DB'))
    .catch((error) => console.error('An error has ocurred trying to connect to the DB'))