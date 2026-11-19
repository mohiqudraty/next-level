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
import { pool } from "./db";
import { userRoute } from "./modules/user/user.route";

// ─────────────────────────────────────────────
// 2. APP & CONFIG
// ─────────────────────────────────────────────
const app: Application = express(); // Create the Express application instance


// ─────────────────────────────────────────────
// 3. MIDDLEWARE — parse incoming request bodies
// ─────────────────────────────────────────────
// Without these, req.body would be undefined for JSON/text/urlencoded requests
app.use(express.json()); // Parses Content-Type: application/json
// app.use(express.text()); // Parses Content-Type: text/plain
// app.use(express.urlencoded({ extended: true })); // Parses form data (application/x-www-form-urlencoded)

// ─────────────────────────────────────────────
// 6. ROUTES — CRUD
// ─────────────────────────────────────────────
// user api -->go to route for method
app.use("/api/v1/users", userRoute);






export default app;