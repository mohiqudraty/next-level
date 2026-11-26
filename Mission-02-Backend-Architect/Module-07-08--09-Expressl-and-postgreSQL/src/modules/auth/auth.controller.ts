import type { Request, Response } from "express";
import { authService } from "./auth.service";
import { sendResponse } from "../../utils/sendRespons";

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.verifiedUserFromDb(req.body);

    const { refreshToken } = result;

    res.cookie("refreshToken", refreshToken, {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
      // maxAge:
      // path
      // domain
    });

    res.status(200).json({
      success: true,
      message: "user logged in sucessfully!",
      data: {
        result,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
const refreshToken = async (req: Request, res: Response) => {
  try {
  //  console.log();
    const result = await authService.generateAccessToken(
      req.cookies.refreshToken,
    );

   

    res.cookie("refreshToken", refreshToken, {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
      // maxAge:
      // path
      // domain
    });
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User Logged in Succesfully!",
      data: result
})
   
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error?.message,
      error: error
    });
  }
};

export const authController = {
  loginUser,
  refreshToken,
};
