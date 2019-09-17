const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const app = express();

// Middleware
app.use(express.json());

// DB Config
const db = config.get('mongoURI');
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('MongoDB connected ...'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/items', require('./route/api/Items'));
app.use('/api/users', require('./route/api/Users'));
app.use('/api/auth', require('./route/api/Auth'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started at port ${port}`));
