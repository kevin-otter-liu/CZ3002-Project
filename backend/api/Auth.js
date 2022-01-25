const ax = require('axios');
const axios = ax.create({
  baseURL: 'https://identitytoolkit.googleapis.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

const auth = (app) => {
  // route handlers for api

  // Sign in API
  const signIn = async (req, res, next) => {
    try {
      let firebaseResponse = await axios.post(
        `/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`,
        {
          email: req.body.email,
          password: req.body.password,
          returnSecureToken: true,
        }
      );

      res.status(200).send({
        idToken: firebaseResponse.data.idToken,
        email: firebaseResponse.data.email,
        refreshToken: firebaseResponse.data.refreshToken,
        expiresIn: firebaseResponse.data.expiresIn,
      });
    } catch (error) {
      // default status
      let status = 422;
      if (error.response.status) {
        status = error.response.status;
      }

      // return a list of errors to client
      let errors = error.response.data.error.errors.map((error) => {
        return { message: error.message, reason: error.reason };
      });

      res.status(status).send(errors);
    }
  };

  // Sign Up API
  const signUp = async (req, res, next) => {
    try {
      let firebaseResponse = await axios.post(
        `/v1/accounts:signUp?key=${process.env.FIREBASE_API_KEY}`,
        {
          email: req.body.email,
          password: req.body.password,
          returnSecureToken: true,
        }
      );

      res.status(200).send({
        idToken: firebaseResponse.data.idToken,
        email: firebaseResponse.data.email,
        refreshToken: firebaseResponse.data.refreshToken,
        expiresIn: firebaseResponse.data.expiresIn,
      });
    } catch (error) {
      // default status
      let status = 422;
      if (error.response.status) {
        status = error.response.status;
      }

      let errors = error.response.data.error.errors.map((error) => {
        return { message: error.message, reason: error.reason };
      });

      res.status(status).send(errors);
    }
  };

  //definition of routes
  app.post('/api/v1/sign-in', signIn);
  app.post('/api/v1/sign-up', signUp);
};

module.exports = (app) => {
  auth(app);
};
