import express, { Request, Response } from "express";
import RTDAO from "../db/dao/refreshToken.dao";
import RefreshToken from "../db/model/RefreshToken";
import User from "../db/model/User";

const router = express.Router();

router.get("/health", healthCheck);
router.get("/", getAllRefreshTokens);
router.get("/by_token", getTokenByToken);
router.get("/by_user_id", getTokenByUserId);
router.post("/create", createToken);
router.delete("/token", deleteToken);

const rtDAO: RTDAO = new RTDAO();

function healthCheck(req: Request, res: Response) {
    return res.json({ msg: "on - rt" });
}

async function getAllRefreshTokens(req: Request, res: Response) {
    //
    const tokens = await rtDAO.getAllTokens();
    return res.json({ tokens: tokens });
}

async function getTokenByToken(req: Request, res: Response) {
    //
    const t = req.body.token;
    const found = await rtDAO.getTokenByToken(t);
    return res.json({ token: found });
}

async function getTokenByUserId(req: Request, res: Response) {
    //
    const userId = req.body.userId;
    // const f: RefreshToken = await rtDAO.getTokenByUserId(userId);
    const f = "placeholder";
    return res.json({ token: f });
}

async function createToken(req: Request, res: Response) {
    //
    const tokenString = "someString" + Math.floor(Math.random() * 10000).toString();
    const newToken = await rtDAO.createToken(tokenString);
    // todo: mk have user attached
    return res.json({ token: newToken });
}

function deleteToken(req: Request, res: Response) {
    //
}

export default router;
