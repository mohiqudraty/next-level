import type { Request, Response } from "express"
import { profileService } from "./profile.service";



const createProfile = async (req: Request, res: Response) => {
  try {
    const result = await profileService.createProfileIntoDB(req.body);

    // 201 = resource was created
    res.status(201).json({
      success: true,
      message: "Profile created",
      data: result,
    });
  } catch (error: any) {
    if (error.code === "23505") {
      return res
        .status(409)
        .json({ success: false, message: "Profile already exists" });
    }
    if (error.code === "23503") {
      return res
        .status(400)
        .json({ success: false, message: "Invalid user_id" });
    }
    if (error.message?.includes("User not registered")) {
      return res.status(404).json({ success: false, message: error.message });
    }
    console.error("POST /profile error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const profileController = {
  createProfile,
};