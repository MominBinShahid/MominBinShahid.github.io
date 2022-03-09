# Setup Guide

## Development

To start development, clone the repo and run command `npm run init` as this will install all the dependencies and then, your app will be running on localhost on default port i.e. [localhost:8000](https://localhost:8000)

> If you already have dependencies installed, you can just start the server by running `npm start`

Just make sure **node >=14.16.1** is installed, see package.json for more details

## Setup `.env` and Github Secrets
We have two types of `.env` files i.e. `.env.development` and `.env.production`.
- `.env.development` is for development and testing purposes, which works with `npm start`
- `.env.production` is for production build and this *.env* will be used while building and deploying the app i.e. `npm run build`

To setup these files locally, just copy the pattern of `.example.env` and create both *.env* files

For Github Secrets, go to **Actions secrets** and create **New repository secret** with same name as defined inside `.example.env` e.g. `GA_TRACKING_ID`, .etc

### Essentials Checks

- To setup github and bitbucket using ssh config follow [this](https://gist.github.com/rosswd/e1afd2b0b0d515517eac#gistcomment-1709305)
- If you are looking to do some development, make sure to setup git user name and email before commit anything (I have forgotten this step in past and tagged my work email in the personal website commits 😝) follow [this](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-user-account/managing-email-preferences/setting-your-commit-email-address#setting-your-email-address-for-a-single-repository)
    - do set `git config user.name "Your project specific name"` and  `git config user.email "your@project-specific-email.com"` locally to fix the issue of committing using global or wrong email and name (see signing commits and tags)
- Before running any command make sure to use `nvm use lts/fermium`
- When using `npm run serve`, do `npm run build` first, check [this](https://github.com/gatsbyjs/gatsby/issues/3896)
- While doing `npm run serve` if you debug you will notice that inside gatsby config files the process.env.NODE_ENV will be `undefined`
  - if you wanted to fix that on mac you can use `"serve": "NODE_ENV=production gatsby serve"` inside _npm scripts_ or visit these links [1](https://github.com/gatsbyjs/gatsby/issues/3896), [2](https://spectrum.chat/gatsby-js/general/node-env-undefined-with-gatsby-serve~90bd8a7e-8028-4aa3-b68e-ab7052d0b06a)

