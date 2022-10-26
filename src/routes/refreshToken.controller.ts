import express, { Request, Response } from "express";
import RTDAO from "../db/dao/refreshToken.dao";
import RefreshToken from "../db/model/RefreshToken";
import User from "../db/model/User";

class RTController {
    public path = "/rt";
    public router = express.Router();
    private rtDAO: RTDAO;

    constructor() {
        this.rtDAO = new RTDAO();

        this.router.get("/health", this.healthCheck.bind(this));
        this.router.get("/", this.getAllRefreshTokens.bind(this));
        this.router.get("/by_token", this.getTokenByToken.bind(this));
        this.router.get("/by_user_id", this.getTokenByUserId.bind(this));
        this.router.post("/create", this.createToken.bind(this));
        this.router.delete("/token", this.deleteToken.bind(this));
    }
    public healthCheck(req: Request, res: Response) {
        return res.json({ msg: "on - rt" });
    }

    public async getAllRefreshTokens(req: Request, res: Response) {
        //
        const tokens = await this.rtDAO.getAllTokens();
        return res.json({ tokens: tokens });
    }

    public async getTokenByToken(req: Request, res: Response) {
        //
        const t = req.body.token;
        const found = await this.rtDAO.getTokenByToken(t);
        return res.json({ token: found });
    }

    public async getTokenByUserId(req: Request, res: Response) {
        //
        const userId = req.body.userId;
        // const f: RefreshToken = await rtDAO.getTokenByUserId(userId);
        const f = "placeholder";
        return res.json({ token: f });
    }

    public async createToken(req: Request, res: Response) {
        //
        const tokenString = "someString" + Math.floor(Math.random() * 10000).toString();
        const newToken = await this.rtDAO.createToken(tokenString);
        // todo: mk have user attached
        return res.json({ token: newToken });
    }

    public deleteToken(req: Request, res: Response) {
        //
    }
}
export default RTController;
// export default router;
