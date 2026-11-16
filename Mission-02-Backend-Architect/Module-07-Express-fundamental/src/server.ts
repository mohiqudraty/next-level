// ─────────────────────────────────────────────
// 1. IMPORTS
// ─────────────────────────────────────────────
// `express` (default export) → creates the app instance
// `type Application` → the type of the Express app (for explicit typing)
// `type Request, type Response` → types for route handler parameters
// `Pool` → manages a pool of reusable DB connections (avoids opening/closing per query)
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Pool } from "pg";
import config from "./config";


// ─────────────────────────────────────────────
// 2. APP & CONFIG
// ─────────────────────────────────────────────
const app: Application = express(); // Create the Express application instance
// const port = 5000; // Port the server will listen on

// ─────────────────────────────────────────────
// 3. MIDDLEWARE — parse incoming request bodies
// ─────────────────────────────────────────────
// Without these, req.body would be undefined for JSON/text/urlencoded requests
app.use(express.json());                       // Parses Content-Type: application/json
app.use(express.text());                       // Parses Content-Type: text/plain
app.use(express.urlencoded({ extended: true })); // Parses form data (application/x-www-form-urlencoded)

// ─────────────────────────────────────────────
// 4. DATABASE CONNECTION
// ─────────────────────────────────────────────
// Pool maintains a set of open connections (default max: 10)
// Reuses connections instead of opening a new one per query → faster
// ⚠️  sslmode=false is INSECURE for Neon. Use sslmode=require in production.
const pool = new Pool({
  connectionString: config.connection_string
});
// ─────────────────────────────────────────────
// 5. DB INITIALIZATION (dev only)
// ─────────────────────────────────────────────
// Creates the table if it doesn't exist. Safe to re-run.
// In production, use migrations (e.g., Drizzle, Knex, or raw .sql files).
const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        ID          SERIAL PRIMARY KEY,           -- Auto-incrementing integer, unique identifier
        name        VARCHAR(255),                 -- Optional, max 255 chars
        email       VARCHAR(255) UNIQUE NOT NULL, -- Required, must be unique across all rows
        password    VARCHAR(255) NOT NULL,        -- Required (⚠️ should be hashed, see notes)
        age         INT,                          -- Optional integer
        is_Active   BOOLEAN DEFAULT true,         -- Defaults to true if not provided
        created_at  TIMESTAMP DEFAULT NOW(),      -- Auto-set on INSERT
        updated_at  TIMESTAMP DEFAULT NOW()       -- Manually updated on PUT
      );
    `);
    console.log("✅ DB connected, table ready");
  } catch (error) {
    console.error("❌ DB init failed:", error);
    process.exit(1); // If DB can't connect, the app is useless → exit
  }
};

// ─────────────────────────────────────────────
// 6. ROUTES — CRUD
// ─────────────────────────────────────────────


// const initDB = async () => {
//   try {
//     await pool.query(`
//       CREATE TABLE IF NOT EXISTS users(
//       ID SERIAL PRIMARY KEY,
//       name VARCHAR(255),
//       email VARCHAR(255) UNIQUE NOT NULL,
//       password VARCHAR(255) NOT NULL,
//       age INT,
//       is_Active BOOLEAN DEFAULT true,

//       created_at TIMESTAMP DEFAULT NOW(),
//       updated_at TIMESTAMP DEFAULT NOW()
//       )
//       `);
//     console.log("DB connected");
//   } catch (error) {
//     console.log(error);
//   }
// };
// initDB();

// post mehtod ----------
// ─── POST /api/v1/users ─── Create a new user
app.post("/api/v1/users", async (req: Request, res: Response) => {
  try {
    // Destructure expected fields from the parsed JSON body
    const { name, email, password, age } = req.body;

    // --- Validation: required fields ---
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "email and password are required",
      });
    }

    // --- Validation: age range (if provided) ---
    if (age !== undefined && (age < 0 || age > 150)) {
      return res.status(422).json({
        success: false,
        message: "age must be between 0 and 150",
      });
    }

    // Insert and return the created row
    const result = await pool.query(
      `INSERT INTO users (name, email, password, age)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name ?? null, email, password, age ?? null]
    );

    // 201 = resource was created
    res.status(201).json({
      success: true,
      message: "User created",
      data: result.rows[0],
    });
  } catch (error: any) {
    // 23505 = Postgres unique constraint violation (duplicate email)
    if (error.code === "23505") {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }
    // Anything else = server-side problem
    console.error("POST /users error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// ─── GET /api/v1/users ─── List all users
app.get("/api/v1/users", async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);

    res.status(200).json({
      success: true,
      message: "All users fetched",
      data: result.rows,
    });
  } catch (error: any) {
    // DB query failed = server error, NOT a 404
    console.error("GET /users error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// ─── GET /api/v1/users/:id ─── Get single user by ID
app.get("/api/v1/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Route parameter — always a string

    const result = await pool.query(
      `SELECT * FROM users WHERE ID = $1`,
      [id]
    );

    // No rows returned → user doesn't exist
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `User with ID ${id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: `User fetched by ID: ${id}`,
      data: result.rows[0], // Single object, not array
    });
  } catch (error: any) {
    console.error("GET /users/:id error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// ─── PUT /api/v1/users/:id ─── Update user (partial update via COALESCE)
app.put("/api/v1/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, age, password, is_Active } = req.body;

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
      [name ?? null, age ?? null, password ?? null, is_Active ?? null, id]
    );

    // No rows affected → user doesn't exist
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: `User with ID ${id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated",
      data: result.rows[0],
    });
  } catch (error: any) {
    console.error("PUT /users/:id error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// ─── DELETE /api/v1/users/:id ─── Delete user by ID
app.delete(
  "/api/v1/users/:id",
  async (req: Request<{ id: string }>, res: Response) => {
    try {
      const { id } = req.params;

      // Validate ID
      if (!/^\d+$/.test(id)) {
        return res.status(400).json({
          success: false,
          message: "id must be a positive integer",
        });
      }

      const result = await pool.query(`DELETE FROM users WHERE ID = $1`, [id]);

      // rowCount = 0 → no user was deleted
      if (result.rowCount === 0) {
        return res.status(404).json({
          success: false,
          message: `User with ID ${id} not found`,
        });
      }

      // 204 = No Content (standard for successful DELETE)
      res.status(204).send();
    } catch (error: any) {
      console.error("DELETE /users/:id error:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
);

// ─────────────────────────────────────────────
// 7. START SERVER
// ─────────────────────────────────────────────
// Wait for DB init to finish before accepting requests
initDB().then(() => {
  app.listen(config.port, () => {
    console.log(`🚀 Server running on http://localhost:${config.port}`);
  });
});
