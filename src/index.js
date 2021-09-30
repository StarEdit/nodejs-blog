const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');

const route = require('./routes');

const app = express();
const port = 3000;
const db = require('./config/db');

//Connect to database
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

//HTTP logger
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded());

//Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
