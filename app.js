const express = require('express');
const cors = require('cors');
const router = require('./routes');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log('Running on port:', port);
});