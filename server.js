//imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const api = require('./routes/api.route');
const env = require('./environments/env');
const mongoose = require('mongoose');

//express config
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', api);

//mongoose config
mongoose.connect(env.mongo_url, { useNewUrlParser: true });

app.listen(env.port, function(){
    console.log('Server is running on Port',env.port);
});