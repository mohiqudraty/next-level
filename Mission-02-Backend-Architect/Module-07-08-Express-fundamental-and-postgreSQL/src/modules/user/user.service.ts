
import { pool } from "../../db";
import type { IUser } from "./user.interface";
import bcrypt from "bcrypt";

// create user to DB ----
const createUserIntoDB = async (payLoad: IUser) => {
  // Destructure expected fields from the parsed JSON body
  const { name, email, password, age } = payLoad;


  const hashedPassword = await bcrypt.hash(password, 10)
 
  
  // Insert and return the created row
  const result = await pool.query(
    `INSERT INTO users (name, email, password, age)
       VALUES ($1, $2, $3, $4) RETURNING * --name, email, age`,
    [name, email, hashedPassword, age ?? null],
  );

  delete result.rows[0].password
  return result;
};;

// get all users from DB ----
const getAllUsersIntoDB = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
}

// get single user from DB 
const getSingleUserIntoDB = async (id: any) => {
  const result = await pool.query(`SELECT * FROM users WHERE ID = $1`, [id]);
  return result
}

// update user data from DB
const updateUserIntoDB = async (id:any,payLoad : any) => {
   const { name, age, password, is_Active } = payLoad;
  // COALESCE($1, name) → if $1 is NULL, keep the existing value
  // This allows partial updates: only send the fields you want to change
  const result = await pool.query(
    `UPDATE users
       SET
         name       = COALESCE($1, name),
         age        = COALESCE($2, age),
         password   = COALESCE($3, password),
         is_Active  = COALESCE($4, is_Active),
         updated_at = NOW()
       WHERE ID = $5
       RETURNING *`,
    [name ?? null, age ?? null, password ?? null, is_Active ?? null, id],
  );
  return result;
};


// delete user from db ---
const userDeleteIntoDB = async (id: any) => {
  const result = await pool.query(`DELETE FROM users WHERE ID = $1`, [id]);
  return result;
}


export const userService = {
  createUserIntoDB,
  getAllUsersIntoDB,
  getSingleUserIntoDB,
  updateUserIntoDB,
  userDeleteIntoDB,
};