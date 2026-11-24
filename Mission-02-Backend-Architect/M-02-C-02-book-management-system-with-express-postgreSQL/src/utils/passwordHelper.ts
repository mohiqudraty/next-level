import bcrypt from "bcryptjs";



const hashPassword = async (plainPass: string) => {
  return await bcrypt.hash(plainPass, 10);
}

const compareHash = async (plainPass: string, hashPass: string) => {
  return await bcrypt.compare(plainPass, hashPass)
}

export const passHelper = {
  hashPassword,
  compareHash
}