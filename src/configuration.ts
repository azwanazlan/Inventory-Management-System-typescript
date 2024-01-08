import dotenv from 'dotenv';

interface AppConfig {
    DB_HOST: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    PORT: number;
}

dotenv.config();

export const ENV: AppConfig = {
  DB_HOST: process.env.DB_HOST || 'defaultHost',
  DB_NAME: process.env.DB_NAME || 'defaultName',
  DB_USER : process.env.DB_USER || 'defaultUser',
  DB_PASSWORD : process.env.DB_PASSWORD || '',
  PORT : parseInt(process.env.PORT || '3000' , 10),
}