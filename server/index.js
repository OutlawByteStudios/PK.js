const config = require('./server-config');
const server = require(config.env === 'production'
  ? './build/app'
  : './src/app').default;

server.listen(config.port, () =>
  console.log(`Server started on port ${config.port}`)
);
server.timeout = 240000;