import config from 'config';

export const databaseService = {
    tablespost,
    storeprocedurespost,
    viewspost,
    storeproceduretextpost
};

function tablespost(pDataConnection) {
    var data = {
      server: pDataConnection.Server,
      user: pDataConnection.User,
      password: pDataConnection.Password,
      database: pDataConnection.DataBase,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    return fetch(`${config.apiUrl}/structure/tables`, requestOptions).then(
        handleResponse
    );
}

function storeprocedurespost(pDataConnection) {
    var data = {
        server: pDataConnection.Server,
        user: pDataConnection.User,
        password: pDataConnection.Password,
        database: pDataConnection.DataBase,
    };
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    return fetch(`${config.apiUrl}/structure/storeprocedures`, requestOptions).then(
        handleResponse
    );
}

function storeproceduretextpost(pDataConnection) {
    var data = {
        server: pDataConnection.Server,
        user: pDataConnection.User,
        password: pDataConnection.Password,
        database: pDataConnection.DataBase,
        objectname: pDataConnection.ObjectName,
    };
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    return fetch(`${config.apiUrl}/structure/storeproceduretext`, requestOptions).then(
        handleResponse
    );
}

function viewspost(pDataConnection) {
var data = {
    server: pDataConnection.Server,
    user: pDataConnection.User,
    password: pDataConnection.Password,
    database: pDataConnection.DataBase,
};
const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
};

return fetch(`${config.apiUrl}/structure/views`, requestOptions).then(
    handleResponse
);
}

function handleResponse(response) {
return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
    }
    return data;
});
}
