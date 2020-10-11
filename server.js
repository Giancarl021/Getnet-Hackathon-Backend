const createEnvironment = require('./src/services/environment');

console.log('[STATUS] Starting pre-run procedures...');
createEnvironment();

const app = require('./src/app');

const port = process.env.PORT || 3000;

console.log('[ENV] Port set to: ' + port);

app.listen(port, () => console.log('[STATUS] Server listening...'));