const express = require('express');
const authRoute = require('./authRoute');
const postsRoute = require('./postsRoute');


const apiRoute = express.Router();

/**
 *  Authentications Routes
 */

apiRoute.use('/v1/auth', authRoute);


/**
 *  Feed stream route
 */

apiRoute.use('/v1/feed', postsRoute);

/**
 *  Articles Endpoints
 */
apiRoute.use('/v1/articles', postsRoute);


/**
 *  Gifs Endpoints
 */

apiRoute.use('/v1/gifs', postsRoute);

module.exports = apiRoute;