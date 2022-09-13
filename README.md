<div align="center">
  <a href="https://marodevv-devto-clone.vercel.app">
        <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--QG4or-x4--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/jrzutxzs0l43wqvw5k8z.png" alt="DEV.to Clone" width="200">
  </a>
  <br />
  <br />
  <h1>Dev.to-clone</h1>
  <br />
</div>

> An DEV.to clone created with MERN stack and more (Essentially FB without stories but for developers)

<a href="https://marodevv-devto-clone.vercel.app">
  <img src='https://user-images.githubusercontent.com/90101257/190000739-e824f9a6-2014-4df1-8aca-6ce64e11f4dd.PNG' />
</a>

## Tech used with *vite*🔥:

> Frontend

- React
- Redux toolkit
- Tailwind
- Styled components
- Framer motion
- React router
- Cloudinary
- OAuth

> Backend

- MongoDB
- Express
- Node.js
- JWT
- Socket.io
- Axios

## Live

> Client: https://marodevv-devto-clone.vercel.app

> Server: https://marodevv-devto-clone.vercel.app

## Features

- Login / Signup
- Google / Github OAuth
- Real-time Notifications
- CRUD Posts / Comments / Replies / Tags
- Follow / Unfollow Users
- Like / Unicorn / Bookmark Posts
- View / Edit Profile
- Advanced Search engine
- Reading List
- Dashboard

## Screenshots

### Login / Signup / Edit / Delete

### Google / github OAuth

### Create / Update / Edit / Delete Posts

### Reactions / Comments / Follows with Real-time notifications

### Tags / ReadingList

### Dashboard

### Search Engine

## How to setup locally

### Clone Repo

Clone the repo to your local machine by `https://github.com/marodevv/dev.to-clone`

### Setup

Install all dependencies in both `client` and `server` subdirectories by `npm i`

```shell
$ cd server && npm i
$ cd client && npm i
```

### Create

A MongoDB database either locally or online via <a href='https://www.mongodb.com/cloud/atlas'>MongoDB Atlas</a>

A <a href="https://cloudinary.com/">Cloudinary account</a>

A new project on <a href='https://console.cloud.google.com'>Google Cloud Platform</a>

A `.env` file in in both `client` and `server` subdirectories

ENV variables

`client/.env`:

```js
BASE_URL=
GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
GITHUB_CLIENT_ID=${GITHUB_CLIENT_ID}
GITHUB_CLIENT_SECRET=${GITHUB_CLIENT_SECRET}
```

`server/.env`:

```js
ACCESS_TOKEN_SECRET=
REFRESH_TOKEN_SECRET=

CLIENT_URL=

GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
GITHUB_CLIENT_ID={GITHUB_CLIENT_ID}
GITHUB_CLIENT_SECRET=${GITHUB_CLIENT_SECRET}

DB_NAME=
DB_USER=
DB_PASSWORD=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_DEFAULT_URL= // default image url
CLOUDINARY_DEFAULT_PUBLIC_ID= default image public_id
```

Finally, run <code>npm run stack</code> on the root of the two subdirectories

## Credit

> Dev.to clone By me
