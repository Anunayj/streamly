import { Sequelize } from 'sequelize';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const NODE_ENV = process.env.NODE_ENV || 'production';

class Database {
  constructor() {
    if (NODE_ENV === 'production') {
      this.sequelize = new Sequelize(
        process.env.DATABASE_NAME,
        process.env.DATABASE_USER,
        process.env.DATABASE_PASSWORD,
        {
          host: process.env.DATABASE_HOST,
          dialect: 'mariadb',
        }
      );
    } else {
      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const dbPath = path.join(__dirname, 'development.sqlite');
      this.sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: dbPath,
        dialectModule: sqlite3,
      });
    }
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  async close() {
    try {
      await this.sequelize.close();
      // delete database on close if development mode.

      if(NODE_ENV !== 'production') {
        console.log('Deleting development database file');
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        const dbPath = path.join(__dirname, 'development.sqlite');
        await fs.promises.unlink(dbPath);
      }

      console.log('Connection has been closed successfully.');
    } catch (error) {
      console.error('Unable to close the database connection:', error);
    }
  }
}

export default Database;
