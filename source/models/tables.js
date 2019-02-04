import bcrypt from 'bcryptjs';
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
       phoneNumber VARCHAR(50),
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

  sql = `DROP TABLE IF EXISTS candidates;
    CREATE TABLE candidates
    (
       id SERIAL,
       office INT,
       party INT,
       candidate INT
    )`;
  await pool.query(sql);

  sql = `DROP TABLE IF EXISTS votes;
    CREATE TABLE votes
    (
       office INT,
       voter INT,
       candidate INT
    )`;
  await pool.query(sql);

  sql = `DROP TABLE IF EXISTS interestedUsers;
    CREATE TABLE interestedUsers
    (
       office INT,
       userId INT,
       partyId INT
    )`;
  await pool.query(sql);

  sql = `DROP TABLE IF EXISTS partyMembers;
    CREATE TABLE partyMembers
    (
       partyId INT,
       userId INT
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
  const hash = await bcrypt.hash('adminpass', 5);
  await pool.query(sql);
  await pool.query('INSERT INTO users (firstname, lastname, othername, email, phoneNumber, passportUrl, isAdmin, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
    ['jesse', 'efe', 'jesseefe', 'jesse@gmail.com', '1234567', 'logo.jpg', 1, hash]);
  console.log('created');
};

export default createTables;
