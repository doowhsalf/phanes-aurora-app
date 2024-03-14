const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const authMiddleware = require("./authMiddleware");

// Define a simple GraphQL schema
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// Root resolver
const root = {
  hello: () => {
    return "Hello, world!";
  },
};

const app = express();

// Apply the authentication middleware to the GraphQL endpoint
app.use(
  "/graphql",
  authMiddleware,
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Enables the GraphiQL IDE
  })
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
