const path = require('path');
const crypto = require('crypto');
const express = require('express');
const session = require('express-session');
const routes = require('./src/routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '100kb' }));
app.use(
  session({
    // set SESSION_SECRET in production, otherwise everyone gets logged out on restart
    secret: process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex'),
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: 'lax', maxAge: 1000 * 60 * 60 * 24 },
  })
);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Encryption tool running at http://localhost:${PORT}`);
});
