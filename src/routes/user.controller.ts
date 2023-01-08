import express, { Request, Response } from "express";
import { HighlightSpanKind } from "typescript";
import UserDAO from "../db/dao/user.dao";

class UserController {
    public path = "/users";
    public router = express.Router();
    private uDAO: UserDAO;

    constructor() {
        this.uDAO = new UserDAO();
        this.router.get("/health", this.healthCheck.bind(this));
        this.router.get("/", this.getAllUsers.bind(this));
        this.router.get("/by_id", this.getUserById.bind(this));
        this.router.get("/by_token", this.getUserByToken.bind(this));
        this.router.get("/with_tokens", this.getUsersWithTokens.bind(this));
        this.router.post("/create", this.createUser.bind(this));
        this.router.delete("/user", this.deleteUser.bind(this));
    }

    public healthCheck(req: Request, res: Response) {
        return res.json({ msg: "on - users" });
    }

    public async getAllUsers(req: Request, res: Response) {
        const a = await this.uDAO.getAllUsers();
        return res.json({ users: a });
    }

    public async getUserById(req: Request, res: Response) {
        const a = await this.uDAO.getUserByUserId(req.body.userId);
        return res.json({ user: a });
    }

    public async getUserByToken(req: Request, res: Response) {
        const a = await this.uDAO.getUserByToken(req.body.token);
        return res.json({ user: a });
    }

    public async getUserByTokenId(req: Request, res: Response) {
        const tokenId = req.body.tokenId;
        const a = await this.uDAO.getUserByTokenId(tokenId);
        return res.json({ user: a });
    }

    public async getUsersWithTokens(req: Request, res: Response) {
        const a = await this.uDAO.getUsersWithTokens();
        return res.json({ users: a });
    }

    public async createUser(req: Request, res: Response) {
        const e = req.body.email;
        const fn = req.body.firstName;
        const a = await this.uDAO.createUser(e, fn);
        return res.json({ user: a });
    }

    public async deleteUser(req: Request, res: Response) {
        //
    }
}
export default UserController;
// export default router;
