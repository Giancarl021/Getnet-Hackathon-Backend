const axios = require('axios').default;
const qs = require('querystring');

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

if(!clientId || !clientSecret) {
    console.log('[AUTHENTICATION] Could not load the credentials form environment variables. Shutting down...');
    process.exit(1);
}
console.log(`[AUTHENTICATION] Loaded credentials from environment variables`);

module.exports = async function () {
    try {
        const response = (await axios.post('https://api-sandbox.getnet.com.br/auth/oauth/v2/token', qs.encode({
            scope: 'oob',
            grant_type: 'client_credentials'
        }), {
            headers: {
                Authorization: getToken(),
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json, text/plain, */*'
            }
        })).data;

        return response.access_token;
    } catch (err) {
        console.log(getToken());
        throw new Error(err.response.data.error_description || err.response.data.error);
    }

    function getToken() {
        return 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
    }
}