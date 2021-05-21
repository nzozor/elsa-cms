module.exports = {
  url: `mongodb://localhost:27017/${process.env.MONGO_DEFAULT_DATABASE || 'elsa-website'}` // Template literal
};
