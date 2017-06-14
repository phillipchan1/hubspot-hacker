# Hubspot Hacker
> Adding Custom Functionality to Hubspot

## Table of Contents
1. [Getting Started](#getting-started)
2. [Deploying](#deploying)

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


