# Read First
This project leverages the Netlify platform for auto-deployments. Practically everything you need for deployments lives in Netlify. The project is setup for push to deploy for the develop (test) and main (prod) branches respectively. Each branch is configured within Netlify with specific env vars for the different environments.
This covers the front-end as well as serverless functions. If you stick with Netlify you should run through their [quickstart](https://docs.netlify.com/cli/get-started/). After cli setup, you will run the command `yarn dev` from there on out to spin up localhost dev server.

## Deployment Links
- [test](https://test-cyberheroes.netlify.app)
- [prod](https://prod-cyberheroes.netlify.app)

## Resources
Contentful is used for the hosted CMS content so the client can control the dynamic data that flows through the app.

MongoDB is the database. It is a no-SQL, non-relational database that uses a document object model. You can view the db within a browser, or download the MongoDB Atlas program.

SendGrid is used for the automated registration emails. You will need to finish the account setup and plug in the final key you get from account completion in the ENV vars before it will work again. The code 100% works, I've had it completed with my personal SendGrid account.  For obvious reasons, I pulled my API keys out.

You will need to setup an AWS account (Or whatever you like to use for cron jobs) and create a new lambda cron for the automatic leaderboard sync. I had it setup to sync the leaderboard every 10 minutes. I provided the same code I used in my lambda in a file called AWSLAMDA.js in the project.

There is an insomnia.json file in the root of the project directory (currently only in develop branch) that you can use to get started testing the serverless backend functions

## Logins
Check the email (cyberheroshandoff@gmail.com) for passwords to these sites
- [Netlify](https://www.netlify.com/) Login with GitHub creds
- [Contentful](https://be.contentful.com/login) Login with Email (cyberheroshandoff@gmail.com)
- [MongoDB](https://www.mongodb.com/) Login with Google SSO
- [SendGrid](https://app.sendgrid.com/) Login with Email (cyberheroshandoff@gmail.com)
