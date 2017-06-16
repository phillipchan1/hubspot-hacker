# Hubspot Hacker
> Adding Custom Functionality to Hubspot

## Table of Contents
1. [Getting Started](#getting-started)
2. [Deploying](#deploying)
3. [Reinitiating Oauth Connection](#reinitiating)

## Getting Started

1. Clone repo
2. [Install node](https://nodejs.org/en/) (if you haven't)
3. Install [Gulp](http://gulpjs.com/) `npm install -g gulp`
4. Install all dependencies with `npm install` from your terminal in the root directory of project.

To start development

```
npm run dev
```

You'll need to enter your password. This will launch a node server at <a href="http://localhost:80">http://localhost:80</a>

## Deploying

This is a push-to-deploy repo. Every push made to the repo automatically deploys it to WeDeploy.

## Unit Testing

To run unit tests and listen for changes

```
gulp spec
```

## Application Organization

This is a full-stack application. Server code is in `/server` and client code is in `/client`

**Server**

Entry point to application is `server/index.js`. The rest of the folders are modules along with their tests.

Public facing API's are in `server/api` and `server/web-hooks`

## Reinitiating OAuth Connection

The app requires a persistent oauth connection to Hubspot. Hubspot's workflow is like this: 

1. Login with Hubspot's oauth authorizer, providing it with an HTTPS callback URL.
2. The HTTPS URL that recieves it will have a code in the query parameter
3. That code will need to be sent to Hubspot's Oauth API to request tokens.
4. Included in those tokens recieved is the "access token", which will be able to make all the API calls. However, they expire every 6 hours. Also included in the tokens given is a "refresh token". If you provide Hubspot with that "refresh token", it will provide you with new sets of tokens.
5. Therefore, to get persistent Oauth connection to Hubspot, the app must regularly ask for new tokens so that that app's keys remain active.

This application has the mechanisms to do that and stores the current most active tokens in `/server/oauth/tokens.json`. It has a scheduler to update the token as well.

However in development, the `tokens.json` may be out of date as the tokens on the server differ than the ones on local (as in, if our local tokens are expired, and we push that code to the server, the server's code will be expired).

*To circumvent this issue, whenever deploying, reinitiate a fresh oauth connection by clicking "Reinitiate Oauth Connection" on the app's home page.*
