import { pool } from "./db"

const createUserTable = `
CREATE TABLE IF NOT EXIST users(
id SERIAL PRIMARY KEY,
name VARCHAR(150) NOT NULL,
email VARCHAR(150) UNIQUE NOT NULL,
password VARCHAR(350) NOT NULL,
role VARCHAR(25) 
) CHECK (role IN('admin', 'member')) DEFAULT 'member'
`


export const initDB = async () => {
  await pool.query(createUserTable);
  console.log("User DB Table Created");
  
}