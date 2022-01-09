const express = require('express');
// import ApolloServer
const { ApolloServer } = require('apollo-server-express');

// import our typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

// require react front end
const path = require('path');


// port def
const PORT = process.env.PORT || 3001;
const app = express();

// authentication middleware from utils/ auth.js
const { authMiddleware } = require('./utils/auth');

const startServer = async () => {
  // create a new Apollo server and pass in our schema data
  const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    context: authMiddleware 
  });

  // Start the Apollo server
  await server.start();

  // integrate our Apollo server with the Express application as middleware
  server.applyMiddleware({ app });

  // log where we can go to test our GQL API
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

// Initialize the Apollo server
startServer();

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// build html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// port listener
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});

