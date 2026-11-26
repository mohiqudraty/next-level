// ─────────────────────────────────────────────
// 4. DATABASE CONNECTION
// ─────────────────────────────────────────────
// Pool maintains a set of open connections (default max: 10)
// Reuses connections instead of opening a new one per query → faster

import { Pool } from "pg";
import config from "../config";

// ⚠️  sslmode=false is INSECURE for Neon. Use sslmode=require in production.
export const pool = new Pool({
  connectionString: config.connection_string
});
// ─────────────────────────────────────────────
// 5. DB INITIALIZATION (dev only)
// ─────────────────────────────────────────────
// Creates the table if it doesn't exist. Safe to re-run.
// In production, use migrations (e.g., Drizzle, Knex, or raw .sql files).
export const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        ID          SERIAL PRIMARY KEY,           -- Auto-incrementing integer, unique identifier
        name        VARCHAR(255),                 -- Optional, max 255 chars
        email       VARCHAR(255) UNIQUE NOT NULL, -- Required, must be unique across all rows
        password    VARCHAR(255) NOT NULL,        -- Required (⚠️ should be hashed, see notes)
        age         INT,                          -- Optional integer
        is_Active   BOOLEAN DEFAULT true,         -- Defaults to true if not provided
        role VARCHAR(20) DEFAULT 'user',

        created_at  TIMESTAMP DEFAULT NOW(),      -- Auto-set on INSERT
        updated_at  TIMESTAMP DEFAULT NOW()       -- Manually updated on PUT
      );
    `);

    await pool.query(`
  CREATE TABLE IF NOT EXISTS profile(
  id SERIAL PRIMARY KEY,
  user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE,

  bio TEXT,
  address TEXT,
  phone VARCHAR(15),
  gender VARCHAR(15),

  created_at  TIMESTAMP DEFAULT NOW(),
  updated_at  TIMESTAMP DEFAULT NOW()
  )
  
      `);

    console.log("✅ DB connected, table ready");
  } catch (error) {
    console.error("❌ DB init failed:", error);
    process.exit(1); // If DB can't connect, the app is useless → exit
  }
};