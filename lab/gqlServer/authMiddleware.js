require("dotenv").config();

const authorizedKeys = {
  [process.env.APP_ID_1]: process.env.APP_KEY_1,
};

const authMiddleware = (req, res, next) => {
  // Try to get credentials from headers first
  let appId = req.header("AppId");
  let appKey = req.header("AppKey");

  // If not found in headers, look in query parameters
  if (!appId || !appKey) {
    appId = req.query.appId;
    appKey = req.query.appKey;
  }

  if (authorizedKeys[appId] && authorizedKeys[appId] === appKey) {
    next(); // Proceed to the next middleware or GraphQL resolver
  } else {
    res.status(401).send("Unauthorized request");
  }
};

const authMiddlewareV1 = (req, res, next) => {
  const appId = req.header("AppId");
  const appKey = req.header("AppKey");

  if (authorizedKeys[appId] && authorizedKeys[appId] === appKey) {
    next(); // Proceed to the next middleware/graphql resolver
  } else {
    res.status(401).send("Unauthorized request");
  }
};

module.exports = authMiddleware;
