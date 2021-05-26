Some Points I wanted to mentioned which will be fixed/added in workflows but need to mention these for future as of now

- before running any command make sure to use `nvm use lts/fermium`
- when using `npm run serve`, do `npm run build` first, check [this](https://github.com/gatsbyjs/gatsby/issues/3896)
- while doing `npm run serve` if you debug you will notice that inside gatsby config files the process.env.NODE_ENV will be undefined, if you wanted to fix that on mac you can use `"serve": "NODE_ENV=production gatsby serve"` inside __npm scripts_ or visit these links [1](https://github.com/gatsbyjs/gatsby/issues/3896), [2](https://spectrum.chat/gatsby-js/general/node-env-undefined-with-gatsby-serve~90bd8a7e-8028-4aa3-b68e-ab7052d0b06a)
- do set `git config user.name "Your project specific name"` `git config user.email "your@project-specific-email.com"` locally to fix the issue of committing using global or wrong email and name (see signing commits and tags)
