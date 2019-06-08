module.exports = function(configName) {
  return /^[\w]+(?:\.txt){1}$/.test(configName);
};