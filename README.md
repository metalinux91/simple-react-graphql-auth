# simple-react-graphql-auth
A simple React authentication form, using Apollo, GraphQL and Prisma

To run this app, start by cloning the repository:
`git clone https://github.com/metalinux91/simple-react-graphql-auth.git`

Go into the main project directory and install dependencies:
`cd simple-react-graphql-auth`
`npm install`

From within the main directory, navigate into the `server` directory and repeat the process:
`cd server`
`npm install`

And deploy the service by running `npx prisma deploy`.

To run the project, both the React app and the GraphQL server must be running at the same time. Execute the following command from within both the main and the `server` directories mentioned above:

`npm start`


## Notes

* This app was built using NodeJS version 12.18.1. For best results, this version should be used.
* If you're using `yarn`, just replace `npm` with `yarn` in the above commands, except when deploying `prisma`. In this case, either run `yarn prisma deploy`
* If you have `prisma` installed globally, you may choose to deploy the server by simply running `prisma deploy`.
