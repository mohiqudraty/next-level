import {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import  Jwt, { type JwtPayload }  from "jsonwebtoken";
import config from "../config";
import { pool } from "../db";
"../modules/auth/auth.controller";
const auth = async  (req: Request, res: Response, next: NextFunction) => {
  
  // is token exist ?------
  // is token verified? ----
  // is user exist in DB ? ----
  // is user active? ----
  
  const token = req.headers.authorization;
  
  if (!token) {
    res.status(401).json({
      success: false,
      message: "Unauthorized Access"
    });
  }

  const decode = Jwt.verify(token as string , config.jwtToken) as JwtPayload;
  // check DB for verified token user available or not 
  const user = await pool.query(`
    SELECT * FROM users WHERE email=$1
    `,[decode.email])
  
  if (user.rowCount === 0) {
    res.status(404).json({
      success: false,
      message: "User Not Found!"
  })}
  if (!user.rows[0].is_active) {
    res.status(403).json({
      success: false,
      message: "Forbidden!"
  })}

// add user data in request with  express global namespace declaration 
  req.user = decode


  next()
}


export default auth;