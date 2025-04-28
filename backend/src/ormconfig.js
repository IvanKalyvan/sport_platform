const { databaseConfig } = require('./src/common/config/typeorm.config');
const { ConfigService } = require('@nestjs/config');

const configService = new ConfigService();

module.exports = databaseConfig(configService);
