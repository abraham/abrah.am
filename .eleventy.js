const data = require('./src/index.json');

module.exports = function(eleventyConfig) {
  eleventyConfig.setEjsOptions({
    templateParameters: data,
  });
};
