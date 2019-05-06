const baseConfig = {
  host: 'http://localhost',
  port: 80 /* Must be port 80 due to M&B only connecting on it */,

  mongoDB: 'mongodb://localhost:27017/pk-js',

  steamAPIKey: '58FAA11EC2CF3CFDE0F077108F68AD4A',

  jwtAuth: {
    secret: 'nIn9tFmxP2X-JW4t-OzD_HyqLGAvZnmqrGXzA2dMHQk',
    algorithm: 'HS256'
  }
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
