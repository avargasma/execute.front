import config from 'config';
import { authHeader } from '../_helpers';

export const scriptService = {
    /* register,
    getAll,
    getById */
    execute
};

/* function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`${config.apiUrl}/instituciones`, requestOptions).then(handleResponse);   
}

function getById(id) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/instituciones/getbyid`, requestOptions).then(handleResponse);
}

function register(institucion) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(institucion)
    };

    return fetch(`${config.apiUrl}/instituciones/create`, requestOptions).then(handleResponse);
} */

function execute(pScript){
    var data = {
        server:"DESKTOP-UTJCUNR\\ponao",
        user:"sa",
        password:"2121121512",
        database: "Epiron3DesarrolloGestion",
        script:pScript
    }
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    return fetch(`${config.apiUrl}/executemain`, requestOptions).then(handleResponse);
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}