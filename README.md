# TEAMWORK

Teamwork is an internal social network for employees of an organization. The goal of this application is to facilitate more interaction between colleagues and promote team bonding.

# BADGES

[![Build Status](https://travis-ci.org/leokamwathi/TEAMWORK.svg?branch=develop)](https://travis-ci.org/leokamwathi/TEAMWORK)
[![Greenkeeper badge](https://badges.greenkeeper.io/leokamwathi/TEAMWORK.svg)](https://greenkeeper.io/)
[![Maintainability](https://api.codeclimate.com/v1/badges/9727ada6847d143c70de/maintainability)](https://codeclimate.com/github/leokamwathi/TEAMWORK/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/leokamwathi/TEAMWORK/badge.svg?branch=develop)](https://coveralls.io/github/leokamwathi/TEAMWORK?branch=develop)


# API ENDPOINTS


<table>
<tr><th>URI ENDPOINT</th><th>DESCRIPTION</th><th>AUTHORIZATION</th></tr>

<tr><td>POST /api/v1/auth/create</td><td>Creates a User</td><td>YES</td></tr>

<tr><td>POST /api/v1/auth/signin</td><td>User signin</td><td>NO</td></tr>

<tr><td>PATCH /api/v1/auth/user/<:userId></td><td>Edits a given User information</td><td>YES</td></tr>

<tr><td>PATCH /api/v1/auth/user/<:userId>/feed</td><td>Gets a feed of all articles and gifs posted by a given User</td><td>YES</td></tr>

<tr><td>GET /api/v1/feed</td><td>Gets articles or gifs sorted by most recent</td><td>NO</td></tr>

<tr><td>GET /api/v1/articles/<:articleId></td><td>Gets a given article</td><td>NO</td></tr>

<tr><td>POST /api/v1/articles</td><td>Posts an article</td><td>YES</td></tr>

<tr><td>PATCH /api/v1/articles/<:articleId></td><td>Edit a given article</td><td>YES</td></tr>

<tr><td>DELETE /api/v1/articles/<:articleId></td><td>Delete a given article</td><td>YES</td></tr>

<tr><td>PATCH /api/v1/articles/<:articleId></td><td>Flag a given article</td><td>YES</td></tr>

<tr><td>GET /api/v1/articles/<:articles>/comments</td><td>Gets all comments of a given article</td><td>YES</td></tr>

<tr><td>GET /api/v1/articles/<:articles>/comments<:commentId</td><td>Gets a given comments on a given article</td><td>YES</td></tr>

<tr><td>POST /api/v1/articles/<:articles>/comments</td><td>Posts a comment on a given article</td><td>YES</td></tr>

<tr><td>DELETE /api/v1/articles/<:articles>/comments<:commentId></td><td>Deletes a given comment on a given article</td><td>YES</td></tr>

<tr><td>PATCH /api/v1/articles/<:articles>/comments<:commentId>/flag</td><td>Flags a given comment on a given article</td><td>YES</td></tr>
  
<tr><td>GET /api/v1/gifs/<:articleId></td><td>Gets a given gif</td><td>NO</td></tr>

<tr><td>POST /api/v1/gifs</td><td>Posts an article</td><td>YES</td></tr>

<tr><td>PATCH /api/v1/gifs/<:articleId></td><td>Edit a given gif</td><td>YES</td></tr>

<tr><td>DELETE /api/v1/gifs/<:articleId></td><td>Delete a given gif</td><td>YES</td></tr>

<tr><td>PATCH /api/v1/gifs/<:articleId></td><td>Flag a given gif</td><td>YES</td></tr>

<tr><td>GET /api/v1/gifs/<:articles>/comments</td><td>Gets all comments of a given gif</td><td>YES</td></tr>

<tr><td>GET /api/v1/gifs/<:articles>/comments<:commentId</td><td>Gets a given comments on a given gif</td><td>YES</td></tr>

<tr><td>POST /api/v1/gifs/<:articles>/comments</td><td>Posts a comment on a given gif</td><td>YES</td></tr>

<tr><td>DELETE /api/v1/gifs/<:articles>/comments<:commentId></td><td>Deletes a given comment on a given gif</td><td>YES</td></tr>

<tr><td>PATCH /api/v1/gifs/<:articles>/comments<:commentId>/flag</td><td>Flags a given comment on a given gif</td><td>YES</td></tr>
  
</table>

# INSTALLATION NOTES

Git Clone this repo
npm install
npm test
npm start
