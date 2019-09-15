const express = require('express');
const mongoose = require('mongoose');

const items = require('./route/api/Items');

const app = express();

// Middleware
app.use(express.json());

// DB Config
const db = require('./config/keys').mongoURI;
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connected ...'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/items', items);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started at port ${port}`));
