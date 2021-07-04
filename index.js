const createServer = require('./server');
require('dotenv').config();

createServer()
    .then(server => {
        server.start();
        console.log('Server running at:', server.info.uri);
    })
    .catch(err => {
        console.log(err)
        process.exit(1)
    });
