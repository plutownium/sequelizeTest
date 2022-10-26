import express, { Request, Response } from "express";
import UserDAO from "../db/dao/user.dao";

const router = express.Router();

router.get("/health", healthCheck);
router.get("/", getAllUsers);
router.get("/by_id", getUserById);
router.get("/by_token", getUserByToken);
router.post("/create", createUser);
router.delete("/user", deleteUser);

const uDAO: UserDAO = new UserDAO();

function healthCheck(req: Request, res: Response) {
    return res.json({ msg: "on - users" });
}

async function getAllUsers(req: Request, res: Response) {
    //
    const a = await uDAO.getAllUsers();
    return res.json({ users: a });
}

async function getUserById(req: Request, res: Response) {
    //
    const a = await uDAO.getUserByUserId(req.body.userId);
    return res.json({ user: a });
}

async function getUserByToken(req: Request, res: Response) {
    //
    const a = await uDAO.getUserByToken(req.body.token);
    return res.json({ user: a });
}

async function createUser(req: Request, res: Response) {
    //
    const a = await uDAO.createUser(req.body.email, req.body.firstName);
    return res.json({ user: a });
}

async function deleteUser(req: Request, res: Response) {
    //
}

export default router;
