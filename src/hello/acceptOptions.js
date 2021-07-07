// Usually you can use this function when you need to call other fission function in a browser from another doamin
module.exports = async function () {
    return {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': '*',
        }
    }
}