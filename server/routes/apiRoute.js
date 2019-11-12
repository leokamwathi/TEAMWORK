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


/*
-[] Test for Endpoint : POST /auth/create - user(Create user account)
-[] Test for Endpoint : POST /auth/signin(Login a user)

-[x] Test for Endpoint : GET /feed (Get all articles or gifs, showing the most recently posted articles and gifs first.)

-[] Test for Endpoint : POST /articles(Create an article)
-[x] Test for Endpoint : GET /articles/<:articleId> (Employees can view a specific article.)
-[] Test for Endpoint : PATCH /articles/<:articleId > (Edit an article with given ID)
-[] Test for Endpoint : DELETE /articles/<:articleId > (Delete article with given ID)
-[] Test for Endpoint : POST /articles/<:articleId>/comment (Employees can comment on article with given ID)
-[] Test for Endpoint : DELETE /articles/<:articleId>/comment/<:commentId> (Employees can comment on article with given ID)

-[] Test for Endpoint : POST / gifs(Create an article)
-[] Test for Endpoint : GET /gifs/<:gifId> (Employees can view a specific article.)
-[] Test for Endpoint : PATCH /gifs/<:gifId > (Edit an article with given ID)
-[] Test for Endpoint : DELETE /gifs/<:gifId > (Delete article with given ID)
-[] Test for Endpoint : POST /gifs/<:gifId>/comment (Employees can comment on article with given ID)
-[] Test for Endpoint : DELETE /gifs/<:gifId>/comment/<:commentId> (Employees can comment on article with given ID)
*/
module.exports = apiRoute;