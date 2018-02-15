const logger = require('./utils/logger');
const server = require('./server');

logger.info('Starting server...');

server.listen(80, () => {
  logger.success('Server is running at http://localhost:3000');
});
