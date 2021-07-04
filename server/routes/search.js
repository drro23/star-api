const fetch = require('node-fetch');

const constants = require('../../constants');

/**
 *
 * @param resource
 * @param name
 * @returns {Promise<Object>}
 */
const specificSearch = async (resource, name) => {
    try {
        const url = new URL(`${resource}/?search=${name}`, process.env.SWAPI_BASE_URL);
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            }
        });

        return res.json();
    } catch (e) {
        console.log(e);
    }

    return {};
}

/**
 *
 * @param name
 * @returns {Promise<*[]>}
 */
const genericSearch = async (name) => {
    let promiseResponses = [];
    let responses = [];
    try {
        let resPromises = constants.RESOURCES.map(async (resource) => {
            const url = new URL(`${resource}/?search=${name}`, process.env.SWAPI_BASE_URL);
            let res = await fetch(url, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                }
            });

            return res.json();
        });

        promiseResponses = await Promise.all(resPromises);

        promiseResponses.forEach(res => {
            if (res.count > 0) {
                responses.push(res.results);
            }
        });
    } catch (e) {
        console.log(e);
    }

    return [].concat(responses).flat();
}

/**
 *
 * @param request
 * @param h
 * @returns {Promise<Object>}
 */
const search = async (request, h) => {
    const {resource, name} = request.query;
    let response = undefined;

    if (resource && name) {
        response = await specificSearch(resource, name);
    } else if (name) {
        response = await genericSearch(name);
    }

    if (response) {
        return h.response(response).code(200);
    }

    return h.response(404);
}

module.exports = [
    {
        method: 'GET',
        path: '/search/',
        handler: search,
    },
];
