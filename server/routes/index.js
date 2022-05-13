const path = require('path');
const router = require('express').Router();
const apiRoutes = require('./api');

// Routes
router.use('/api', apiRoutes);

// Spotify Callback
let REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:8888/callback';

router.get('/callback', (req, res) => {
    // your application requests refresh and access tokens
    // after checking the state parameter

    const code = req.query.code || null;
    const state = req.query.state || null;
    const storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
      res.redirect(`/#${querystring.stringify({ error: 'state_mismatch' })}`);
    } else {
      res.clearCookie(stateKey);
      const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: REDIRECT_URI,
          grant_type: 'authorization_code',
        },
        headers: {
          Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
            'base64',
          )}`,
        },
        json: true,
      };

      request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          const access_token = body.access_token;
          const refresh_token = body.refresh_token;

          // we can also pass the token to the browser to make requests from there
          res.redirect(
            `${FRONTEND_URI}/#${querystring.stringify({
              access_token,
              refresh_token,
            })}`,
          );
        } else {
          res.redirect(`/#${querystring.stringify({ error: 'invalid_token' })}`);
        }
      });
    }
  });

  router.get('/refresh_token', function (req, res) {
    // requesting access token from refresh token
    const refresh_token = req.query.refresh_token;
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
          'base64',
        )}`,
      },
      form: {
        grant_type: 'refresh_token',
        refresh_token,
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        res.send({ access_token });
      }
    });
  });

// Serve up static assets if environment is production
if (process.env.NODE_ENV === 'production') {
    router.use(express.static('../../app/dist'));
}

// If no API routes are hit, send to the React app index.html
router.use((_req, res) => res.sendFile(path.join(__dirname, '../../app/dist/index.html')));

module.exports = router;