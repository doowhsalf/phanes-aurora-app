const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const authMiddleware = require("./authMiddleware");

// Connect to MongoDB
mongoose.connect("mongodb://localhost:51017/aurora_pod_001", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Define a Mongoose model according to your document structure
const ContentSchema = new mongoose.Schema({
  // Define schema based on the provided document structure
  translationSetNodeId: String,
  articleCodes: [String],
  nid: String,
  version: String,
  createdAt: Date,
  updatedAt: Date,
  createdBy: String,
  updatedBy: String,
  languages: [
    {
      code: String,
      label: String,
    },
  ],
  masterLanguage: String,
  status: String,
  revisions: [
    {
      createdAt: Date,
      createdBy: String,
      updatedAt: Date,
      updatedBy: String,
      version: String,
      publishedStatus: String,
      language: String,
      languageName: String,
      title: String,
      body: String,
      summary: String,
      translationStatus: String,
      updateMode: String,
      meta: String,
    },
  ],
  typeOfArticle: String,
});

const Content = mongoose.model("Content", ContentSchema);

// Define a GraphQL schema that can query contents and their revisions
const schema = buildSchema(`
  type Query {
    content(id: String!): Content,
    contentByNid(nid: String!): Content,
    contents(status: String, language: String, articleCode: String): [Content],
    articlesByTypeLanguageAndStatus(typeOfArticle: String!, language: String!, publishedStatus: String!): [Content]
    articlesByArticleCodeTypeLanguageAndStatus(status: String!, articleCode: String!, typeOfArticle: String!, language: String!, publishedStatus: String!): [Content]


  }
  type Content {
    _id: String
    translationSetNodeId: String
    articleCodes: [String], 
    nid: String
    version: String
    createdAt: String
    updatedAt: String
    createdBy: String
    updatedBy: String
    languages: [Language]
    masterLanguage: String
    status: String
    revisions: [Revision]
    typeOfArticle: String
  }
  type Language {
    code: String
    label: String
  }
  type Revision {
    createdAt: String
    createdBy: String
    updatedAt: String
    updatedBy: String
    version: String
    publishedStatus: String
    language: String
    languageName: String
    title: String
    body: String
    summary: String
    translationStatus: String
    updateMode: String
    meta: String
  }
`);

// Implement resolvers
const root = {
  // other resolvers unchanged...
  contents: async ({ status, language, articleCode }) => {
    let query = {};
    if (status) {
      query["revisions.publishedStatus"] = status;
    }
    if (language) {
      query["revisions.language"] = language;
    }
    // Assuming you want to match documents that contain the articleCode in their articleCodes array
    if (articleCode) {
      query["articleCodes"] = { $in: [articleCode] };
    }
    return await Content.find(query);
  },
  contentByNid: async ({ nid }) => {
    // Ensure 'nid' is the field you want to query by
    const result = await Content.findOne({ nid: nid });
    console.log("Query result:", result); // Debug: Check the query result
    return result;
  },
  articlesByTypeLanguageAndStatus: async ({
    typeOfArticle,
    language,
    publishedStatus,
  }) => {
    return await Content.aggregate([
      { $match: { typeOfArticle: typeOfArticle } }, // Step 1: Filter documents by typeOfArticle.
      {
        $project: {
          // Step 2: Define which fields to include or exclude.
          translationSetNodeId: 1,
          articleCodes: 1,
          nid: 1,
          version: 1,
          createdAt: 1,
          updatedAt: 1,
          createdBy: 1,
          updatedBy: 1,
          languages: 1,
          masterLanguage: 1,
          status: 1,
          typeOfArticle: 1,
          revisions: {
            // Step 3: Filter the revisions array.
            $filter: {
              input: "$revisions",
              as: "revision",
              cond: {
                $and: [
                  { $eq: ["$$revision.language", language] },
                  { $eq: ["$$revision.publishedStatus", publishedStatus] },
                ],
              },
            },
          },
        },
      },
    ]);
  },

  articlesByArticleCodeTypeLanguageAndStatus: async ({
    articleCode,
    typeOfArticle,
    language,
    publishedStatus,
    status
  }) => {
    return await Content.aggregate([
      {
        $match: {
          typeOfArticle: typeOfArticle, // Filter documents by typeOfArticle.
          articleCodes: { $in: [articleCode] }, // Ensure the document has the specified articleCode.
          status: status
        },
      },
      {
        $project: {
          // Step 2: Define which fields to include or exclude.
          translationSetNodeId: 1,
          articleCodes: 1,
          nid: 1,
          version: 1,
          createdAt: 1,
          updatedAt: 1,
          createdBy: 1,
          updatedBy: 1,
          languages: 1,
          masterLanguage: 1,
          status: 1,
          typeOfArticle: 1,
          revisions: {
            // Step 3: Filter the revisions array.
            $filter: {
              input: "$revisions",
              as: "revision",
              cond: {
                $and: [
                  { $eq: ["$$revision.language", language] },
                  { $eq: ["$$revision.publishedStatus", publishedStatus] },
                ],
              },
            },
          },
        },
      },
    ]);
  },
};

const app = express();

app.use(
  "/graphql",
  authMiddleware,
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
