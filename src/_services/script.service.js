import config from 'config';

export const scriptService = {
    connect
};

function connect(pDataConnection) {
    var data = {
      server: pDataConnection.Server,
      user: pDataConnection.User,
      password: pDataConnection.Password,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    return fetch(`${config.apiUrl}/connection`, requestOptions).then(
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
