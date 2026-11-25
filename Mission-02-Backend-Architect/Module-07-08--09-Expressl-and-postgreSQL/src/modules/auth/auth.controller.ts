import type { Request, Response } from "express";
import { authService } from "./auth.service";


const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.verifiedUserFromDb(req.body)
    res.status(200).json({
      success: true, message: "user logged in sucessfully!",
      data: {
     result
   }
 });
    
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const authController = {
  loginUser
}