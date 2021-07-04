const Bcrypt = require('bcrypt');
const hapi = require('@hapi/hapi');

const config = require('./config')

const users = [{
    username: 'Luke',
    password: '$2b$10$zm.JgrT6CvVBr19ENacubOaEcpiv3ZBmh9vaROArj1lzjTxlr684m'
}];

async function createServer() {
    const server = hapi.server({
        port: config.port,
        routes: {
            cors: true
        }
    });

    // Register the plugins
    await server.register(require('./plugins/router'));
    await server.register(require('./plugins/logging'));
    await server.register(require('./plugins/log-errors'));

    return server
}

module.exports = createServer
