import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a new Sequelize instance with environment variables
const sequelize = new Sequelize(
    process.env.DB_NAME as string,  // Database name
    process.env.DB_USER as string,  // Database user
    process.env.DB_PASSWORD as string,  // Database password
    {
        host: process.env.DB_HOST as string,  // Database host
        port: Number(process.env.DB_PORT) || 5432,  // Database port
        dialect: 'postgres',  // Database dialect
    }
);

export default sequelize;
