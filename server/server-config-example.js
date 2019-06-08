const baseConfig = {
  host: 'http://localhost',
  port: 80 /* Must be port 80 due to M&B only connecting on it */,

  mongoDB: 'mongodb://localhost:27017/pk-js',

  steamAPIKey: '',

  jwtAuth: {
    secret: '',
    algorithm: 'HS256'
  },

  gameserverPortStart: 7240
};

const serverConfig = {
  production: {
    env: 'production',

    ...baseConfig
  },

  development: {
    env: 'development',

    ...baseConfig
  }
};

module.exports = serverConfig[process.env.NODE_ENV || 'development'];
