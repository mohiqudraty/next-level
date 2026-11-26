import { Router, type NextFunction, type Request, type Response} from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const router = Router()

// post mehtod ----------
// ─── POST /api/v1/users ─── Create a new user
//  method applied -> go to controller for req  and res control it will return respons to client 
router.post("/", userController.createUser);
router.get("/",auth("admin", "user"), userController.getAllUsers);
router.get("/:id", userController.getSingleUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);



export const userRoute = router;