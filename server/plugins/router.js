const routes = [].concat(
    require('../routes/search'),
)

module.exports = {
    plugin: {
        name: 'router',
        register: (server, options) => {
            server.route(routes)
        }
    }
}
