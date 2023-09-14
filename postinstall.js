// This is ping to notify ROQ that you started local installation, you can remove it
require('dotenv').config();
const axios = require('axios');

const apiUrl = 'https://api-sw.roq.tech/local-installation';

axios
  .post(apiUrl, { environmentId: process.env.ROQ_CLIENT_ID })
  .then((response) => {})
  .catch((error) => {});
