const fs = require('fs');
const url = require('url');

// Function entry point
module.exports = async function (context) {
    log(LOG_LEVEL.INFO, 'Calling getItems');
    let url_parts = url.parse(context.request.url, true);

    // Getting parameters from either the querystring or the HTTP body
    let querystring_param = url_parts.query.querystring_param_name;
    let body_param = context.body.body_param_name;

    // Getting a Secret parameter
    let secret_param = await getK8Secret("param name");

    // Getting a ConfigMap parameter
    let configMap_param = await getK8Config("param name");

    // Returning the result to the caller
    return {
        status: 200,
        body: {
            message: "Hello World!"
        }
    }
}

// A ready function to get a parameter from K8 Secrets
function getK8Secret(parameterName) {
    return new Promise((resolve, reject) => {
        fs.readFile(`/secrets/default/secret-name-like-in-create.sh/${parameterName}`, 'utf8', function (err, data) {
            if (err) {
                reject(err.message);
            }
            resolve(data);
        });
    });
}

// A ready function to get a parameter from K8 ConfigMap
function getK8Config(parameterName) {
    return new Promise((resolve, reject) => {
        fs.readFile(`/configs/default/config-name-like-in-create.sh/${parameterName}`, 'utf8', function (err, data) {
            if (err) {
                reject(err.message);
            }
            resolve(data);
        });
    });
}

// Log levels
const LOG_LEVEL = {
    ERROR: 'ERROR',
    INFO: 'INFO',
    WARNING: 'WARNING',
}

// A ready logging function that supports both JSON and textual formats
async function log(logLevel, message, loggingMode) {
    if (loggingMode === 'JSON') {
        let log = {
            level: logLevel,
            service: 'Fission',
            ClassName: 'Fission Function',
            message: message,
        };
        console.log(JSON.stringify(log));
    } else {
        console.log(`${new Date().toISOString()} ${logLevel}: ${message}`);
    }
}