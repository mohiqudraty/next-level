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

import { userRoute } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";
import logger from "./middleware/logger";
import globalErrorHandler from "./middleware/globalErrorHandler";
import cors from "cors"
import cookieParser from "cookie-parser";
// 2. APP & CONFIG
const app: Application = express(); // Create the Express application instance
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// 3. MIDDLEWARE — parse incoming request bodies
app.use(cors(corsOptions));
app.use(cookieParser())
// Without these, req.body would be undefined for JSON/text/urlencoded requests
app.use(express.json()); // Parses Content-Type: application/json
app.use(express.text()); // Parses Content-Type: text/plain
app.use(express.urlencoded({ extended: true })); // Parses form data (application/x-www-form-urlencoded)
// logger middleware -----------
app.use(logger)
// 6. ROUTES — CRUD
// user api -->go to route for method
app.use("/api/v1/users", userRoute);
// profile api --> go to route for method 
app.use("/api/v1/profile", profileRoute);

// auth 
app.use("/api/v1/auth", authRoute)


app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "This Is Home Route",
    author: "MOHI"
  })
})

// Global Error Handling Middleware
app.use(globalErrorHandler);


export default app;