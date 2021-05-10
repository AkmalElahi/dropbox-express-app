const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

// constants
const port = process.env.API_PORT || 5000;
const app = express();
// middleware

// rest API requirements
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());
app.use(express.json());

require('./routes')(app);


// mount the application
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});
