const express = require('express');
const cors = require('cors');
const client = require('./client.js');
const app = express();
const ensureAuth = require('./auth/ensure-auth');
const createAuthRoutes = require('./auth/create-auth-routes');
const request = require('superagent');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const authRoutes = createAuthRoutes();

// setup authentication routes to give user an auth token
// creates a /auth/signin and a /auth/signup POST route. 
// each requires a POST body with a .email and a .password
app.use('/auth', authRoutes);

// everything that starts with "/api" below here requires an auth token!
app.use('/api', ensureAuth);

// and now every request that has a token in the Authorization header will have a `req.userId` property for us to see who's talking
app.get('/api/test', (req, res) => {
  res.json({
    message: `in this proctected route, we get the user's id like so: ${req.userId}`
  });
});

app.get('/search', async(req, res) => {
  const data = await request.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${req.query.searchQuery}&page=1&include_adult=false`);

  res.json(data.body.results);
});

app.post('/api/favorites', async(req, res) => {
  try {
    console.log(req.userId, 'hello')
    const data = await client.query(`
    INSERT INTO movies (title, rating, image, overview, owner_id)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *
    `, [req.body.title, req.body.rating, req.body.image, req.body.overview, req.userId]);

    res.json(data.rows[0]);
  } catch (e) { console.log(e)
    res.status(500).json({ error: e.message })
  }
})

app.get('/api/favorites', async(req, res) => {
  try {
    const data = await client.query(`
    SELECT * FROM movies
    WHERE movies.owner_id=$1
    `, [req.userId]);

    res.json(data.rows);
  }
  catch (e) {
    res.status(500).json({ error: e.message });
  }
})

app.delete('/api/favorites/:id', async(req, res) => {
  try {
    const movieId = req.params.id;

    const data = await client.query('DELETE FROM movies WHERE movies.id=$1;', [movieId])

    res.json(data.rows[0])
  }
  catch (e) {
    res.status(500).json({ error: e.message });
  }
})

app.use(require('./middleware/error'));

module.exports = app;
