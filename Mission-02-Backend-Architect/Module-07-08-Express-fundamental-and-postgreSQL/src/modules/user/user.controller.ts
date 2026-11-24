import type { Request, Response } from "express";
import { userService } from "./user.service";
// create user
const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUserIntoDB( req.body);

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
};


// get all users from db 
// ─── GET /api/v1/users ─── List all users
const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsersIntoDB()

    res.status(200).json({
      success: true,
      message: "All users fetched",
      data: result,
    });
  } catch (error: any) {
    // DB query failed = server error, NOT a 404
    console.error("GET /users error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// ─── GET /api/v1/users/:id ─── Get single user by ID
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
   // Route parameter — always a string
    const result = await userService.getSingleUserIntoDB(id);

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
};

// ─── PUT /api/v1/users/:id ─── Update user (partial update via COALESCE)
const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
  
    const result = await userService.updateUserIntoDB(id, req.body);

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
};


// ─── DELETE /api/v1/users/:id ─── Delete user by ID
const deleteUser = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!/^\d+$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "id must be a positive integer",
      });
    }

    const result = await userService.userDeleteIntoDB(id)

    // rowCount = 0 → no user was deleted
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: `User with ID ${id} not found`,
      });
    }

    // 204 = No Content (standard for successful DELETE)
    res.status(204).send()
  } catch (error: any) {
    console.error("DELETE /users/:id error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser
};
