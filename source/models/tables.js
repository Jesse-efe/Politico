import pool from './config';

const createTables = async () => {
  let sql = `DROP TABLE IF EXISTS users;
    CREATE TABLE users
    (
       id SERIAL,
       firstname VARCHAR(50),
       lastname VARCHAR(50),
       othername VARCHAR(50),
       email VARCHAR(50),
       phoneNumber BIGINT,
       passportUrl VARCHAR(1000),
       password VARCHAR(200),
       isAdmin BOOL DEFAULT '0',
       PRIMARY KEY (ID)
    )`;
  await pool.query(sql);

  sql = `DROP TABLE IF EXISTS parties;
    CREATE TABLE parties
    (
       id SERIAL,
       name VARCHAR(50),
       address VARCHAR(100),
       logo VARCHAR(1000),
       PRIMARY KEY (ID)
    )`;
  await pool.query(sql);

  sql = `DROP TABLE IF EXISTS offices;
    CREATE TABLE offices
    (
       id SERIAL,
       type VARCHAR(50),
       name VARCHAR(50),
       PRIMARY KEY (ID)
    )`;
  await pool.query(sql);
  console.log('created');
};

export default createTables;
