//imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const api = require('./routes/api.route');
const env = require('./environments/env');
const mongoose = require('mongoose');
const pkg = require('./package');
const cors = require('cors');

//express config
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', api);
app.get('/healthcheck', function(req, res){
    res.json({
        "name": pkg.name,
        "version": pkg.version,
        "status": "success"
    });
});
//mongoose config
mongoose.connect((env.mongo_url || process.env.mongu_url), { useNewUrlParser: true });

app.listen(env.port, function(){
    console.log('Server is running on Port',(process.env.port || env.port));
});
