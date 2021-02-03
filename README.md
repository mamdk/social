# Social App

## Source code backend (node, mongodb)

### To run this project, do the following:

##### create .env with the following code (update credentials). Make sure to create .env in the root directory of the project. node-backend/.env

```
APP_NAME=nodeapi
MONGO_URI=mongodb://localhost:27017/nodeapi
PORT=8080
JWT_SECRET=xxxxxx
CLIENT_URL=http://localhost:3000
REACT_APP_GOOGLE_CLIENT_ID=xxxxxx.apps.googleusercontent.com
```

##### Then run the following commands to start up the app

```
cd node-backend
npm i
npm start
```
#### This program can have the following:
##### forget-password , role , social login , etc.
