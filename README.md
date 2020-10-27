# COP4331_LargeProject

## Local Setup - Installing dependencies

Installing MongoDB, and setting up the `.env` file is necessary for the server to run

- Specfically, MONGO_URI needs to be defined in `.env`

Running `npm install` will install dependencies using `package.json` and `package.lock`

You should be able to run `npm start` to start the server on localhost:3000

## Code Organization

Static assets such as favicon.ico can be added to `/static`

All server code goes into `/server`

JSX and other code goes into `/client`
