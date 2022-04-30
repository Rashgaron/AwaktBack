const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({path: '../.env'});
const PORT = process.env.PORT || 8080;
const { Auth, User, Sites } = require('./routes');
const docs = require('./docs');
const swaggerUI = require('swagger-ui-express');

mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        const app = express();
        app.use(cors());
        app.use(bodyParser.json());

        app.use('/api/auth', Auth);
        app.use('/api/users', User);
        app.use('/api/sites', Sites);
        
        app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));

        app.get('/*', (req, res) => res.redirect('/api-docs'));
        
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    }).catch(error => {
        console.log(error);
    })
