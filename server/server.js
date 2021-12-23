const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config()


const app = express();
const port = process.env.PORT || 3000;

var cors = require('cors');
app.use(cors({origin: true, credentials: true}));

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }))
app.use(require('./routes/index.routes'))


app.listen(3000, '192.168.0.17', () => {
    console.log(`Server listening on the port  ${port}`);
})

