require('dotenv').config();
const app = require('./src/app');

const port = process.env.PORT || 3000;

console.log('[ENV] Port set to: ' + port);

app.listen(port, () => console.log('[STATUS] Server listening'));