import { Sequelize } from 'sequelize';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.NODE_ENV === 'production' 
    ? '/tmp/database.sqlite'
    : join(__dirname, '../../database.sqlite'),
  logging: false,
  dialectOptions: {
    timeout: 30000,
  },
});

export default sequelize;
