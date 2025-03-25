import { Sequelize } from 'sequelize';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import bcrypt from 'bcrypt';

const NODE_ENV = process.env.NODE_ENV || 'production';
const SALT_ROUNDS = 10;

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
      await this.initializeTables();
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  async close() {
    try {
      await this.sequelize.close();
      // delete database on close if development mode.

      if (NODE_ENV !== 'production') {
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

  async initializeTables() {
    const createTablesSQL = [
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        username VARCHAR,
        email VARCHAR,
        password_hash VARCHAR,
        created_at TIMESTAMP
      );`,
      `CREATE TABLE IF NOT EXISTS direct_messages (
        id INTEGER PRIMARY KEY,
        sender_id INTEGER,
        receiver_id INTEGER,
        text TEXT,
        timestamp TIMESTAMP,
        FOREIGN KEY (sender_id) REFERENCES users(id),
        FOREIGN KEY (receiver_id) REFERENCES users(id)
      );`,
      `CREATE TABLE IF NOT EXISTS subscriptions (
        id INTEGER PRIMARY KEY,
        user_id INTEGER,
        start_date TIMESTAMP,
        end_date TIMESTAMP,
        status VARCHAR,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );`,
      `CREATE TABLE IF NOT EXISTS rooms (
        id INTEGER PRIMARY KEY,
        name VARCHAR,
        created_at TIMESTAMP,
        playback_state JSON
      );`,
      `CREATE TABLE IF NOT EXISTS memberships (
        user_id INTEGER,
        room_id INTEGER,
        joined_at TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (room_id) REFERENCES rooms(id)
      );`,
      `CREATE TABLE IF NOT EXISTS chat_messages (
        id INTEGER PRIMARY KEY,
        user_id INTEGER,
        room_id INTEGER,
        text TEXT,
        timestamp TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (room_id) REFERENCES rooms(id)
      );`
    ];

    try {
      for (const query of createTablesSQL) {
        await this.sequelize.query(query);
      }
      console.log('Tables have been initialized successfully.');
    } catch (error) {
      console.error('Unable to initialize tables:', error);
    }
  }

  async addUser(username, email, password) {
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    try {
      await this.sequelize.query(
        'INSERT INTO users (username, email, password_hash, created_at) VALUES (?, ?, ?, ?)',
        {
          replacements: [username, email, passwordHash, new Date()],
        }
      );
      console.log('User added successfully.');
    } catch (error) {
      console.error('Unable to add user:', error);
    }
  }

  async verifyUser(username, password) {
    try {
      const [results] = await this.sequelize.query(
        'SELECT password_hash FROM users WHERE username = ?',
        {
          replacements: [username],
        }
      );
      if (results.length > 0) {
        const passwordHash = results[0].password_hash;
        const isMatch = await bcrypt.compare(password, passwordHash);
        return isMatch;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Unable to verify user:', error);
      return false;
    }
  }
}

export default Database;
