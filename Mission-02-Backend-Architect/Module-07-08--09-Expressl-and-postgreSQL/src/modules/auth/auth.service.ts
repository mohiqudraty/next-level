import { pool } from "../../db"
import bcrypt from 'bcrypt';
import  Jwt, { type JwtPayload }  from "jsonwebtoken";
import config from "../../config";


const verifiedUserFromDb = async (payLoad: {email: string, password: string}) => {
  // check the user exist in DB ?
  // is password matched ?
  // user status ?
  // all true then genarate JWT token !

  // get user info for checking --->
  const { email, password } = payLoad;
  const user = await pool.query(`
  SELECT * FROM users WHERE email=$1`,[email])

  // console.log(user.rows[0]);
  // user validation ------.
  if (user.rowCount === 0) {
    throw new Error("Invalid Credentials!")
  }
  // password validation with bcrypt-->
  const isPassMatched = await bcrypt.compare(password, user.rows[0].password)
  
  if (!isPassMatched) {
    throw new Error("Invalid Credentials!")
  }

  // check  status for acces -->
  if (!user.rows[0].is_active) {
    throw new Error("Acces Denied!");
  }


  const jwtPayload = await {
    id: user.rows[0].id,
    name: user.rows[0].name,
    email: user.rows[0].email,
    role: user.rows[0].role
  }
  const accessToken = Jwt.sign(jwtPayload, config.jwtToken, {
    expiresIn: "1h",
  });
  const refreshToken = Jwt.sign(jwtPayload, config.jwt_Refresh_Token, {
    expiresIn: "10d",
  });
delete user.rows[0].password;
  return { accessToken, refreshToken, user: user.rows[0] };
}

const generateAccessToken = async (token: string) => {
   if (!token) {
    throw new Error("Unauthorized Access");
   }

   const decode = Jwt.verify(token as string, config.jwt_Refresh_Token) as JwtPayload;
   // check DB for verified token user available or not
   const user = await pool.query(
     `
    SELECT * FROM users WHERE email=$1
    `,
     [decode.email],
   );

   if (user.rowCount === 0) {
    throw new Error("User Not Found!");
   }
   if (!user.rows[0].is_active) {
     throw new Error("Forbidden!")
   }
 const jwtPayload = await {
   id: user.rows[0].id,
   name: user.rows[0].name,
   email: user.rows[0].email,
   role: user.rows[0].role,
 };
 const accessToken = Jwt.sign(jwtPayload, config.jwtToken, {
   expiresIn: "1h",
 });
  return accessToken
}

export const authService = {
  verifiedUserFromDb,
  generateAccessToken,
};