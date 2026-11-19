import { pool } from "../../db";
import type { IProfile } from "./profile.interface";

// profile.service.ts
const createProfileIntoDB = async (payLoad: IProfile) => {
  const { user_id, bio, address, phone, gender } = payLoad;

  const user = await pool.query("SELECT * FROM users WHERE id = $1", [user_id]);
  if (user.rowCount === 0) {
    throw new Error("User not registered. Please recheck your user ID.");
  }

  const result = await pool.query(
    `INSERT INTO profile (user_id, bio, address, phone, gender)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [user_id, bio, address, phone, gender],
  );

  return result.rows[0];
};


export const profileService = {
  createProfileIntoDB,
};