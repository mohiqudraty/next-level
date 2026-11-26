import { Router, type NextFunction, type Request, type Response} from "express";
import { userController } from "./user.controller";
import auth from "../../middleware/auth";

const router = Router()

const USER_ROLE = {
  admin: "admin",
  agent: "agent",
  user: "user"
} as const;

// post mehtod ----------
// ─── POST /api/v1/users ─── Create a new user
//  method applied -> go to controller for req  and res control it will return respons to client 
router.post("/", userController.createUser);
router.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.agent),
  userController.getAllUsers,
);
router.get(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.agent, USER_ROLE.user),
  userController.getSingleUser,
);
router.put(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  userController.updateUser,
);
router.delete(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.user),
  userController.deleteUser,
);



export const userRoute = router;