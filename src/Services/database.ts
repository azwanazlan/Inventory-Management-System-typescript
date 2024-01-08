import { Sequelize } from "sequelize";
import { ENV } from "../configuration";

export const dbContext = new Sequelize(ENV.DB_NAME, ENV.DB_USER, ENV.DB_PASSWORD, {
  host: ENV.DB_HOST,
  dialect: 'mysql',
});

// Test the database connection
export const testDatabaseConnection = async (): Promise<void> => {
  try {
    await dbContext.authenticate();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};

