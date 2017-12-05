const logger = require('./utils/logger');
const server = require('./server');

logger.info('Starting server...');

server.listen(3000, () => {
  logger.success('Server is running at http://localhost:3000');
});
