const Lab = require('@hapi/lab');
const Code = require('@hapi/code');
const nock = require('nock');
const searchMocks = require('./search_mocks.json');
const constants = require('../constants');
const createServer = require('../server');

const lab = exports.lab = Lab.script();

lab.experiment('API test', () => {
    let server;

    // Create server before each test
    lab.before(async () => {
        server = await createServer();
    });

    lab.after(async () => {
        await server.stop();
    });

    lab.test('GET generic search', async () => {
        const name = "ya";

        const options = {
            method: 'GET',
            url: `/search/?name=${name}`,
        }

        let resourcesMock = constants.RESOURCES.map(resource => {
            return nock("https://swapi.dev")
                .get(`/api/${resource}/?search=${name}`)
                .reply(200, searchMocks.genericSearchResponse);
        });

        const response = await server.inject(options);
        resourcesMock.forEach(mock => {
            mock.isDone();
        });
        Code.expect(response.statusCode).to.equal(200);
        Code.expect(response.result).to.equal(searchMocks.searchResponse);
    });
})
