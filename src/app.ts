import express, { Application } from "express";
import { Sequelize } from "sequelize";

import db from "./db/Database";

import initModels from "./db/model/init-models";

import UserController from "./routes/user.controller";
import RTController from "./routes/refreshToken.controller";

class App {
    public app: Application;
    public port: number;
    private db: Sequelize;
    constructor(appInit: { port: number; controllers: any }) {
        //
        this.app = express();
        this.port = appInit.port;
        this.app.use(express.json());
        this.db = db;
        this.initModels(this.db);
        this.db.sync({ force: true });
        // this.db.sync({ force: false });
        // this.middlewares(appInit.middlewares);
        this.controllers(appInit.controllers);
        // this.app.use("/api", getRoutes());
        this.app.use;
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
        });
    }

    private initModels(db: Sequelize) {
        const models = initModels(db);
        console.log(models, "36rm");
    }

    // private middlewares(middlewares: any) {
    //     middlewares.forEach((m: any) => {
    //         this.app.use(m);
    //     });
    // }

    private controllers(controllers: any) {
        controllers.forEach((c: any) => {
            console.log(c.path, "32rm");
            this.app.use(c.path, c.router);
        });
    }
}

const app = new App({
    port: 3000,
    controllers: [new UserController(), new RTController()],
});

export default app;
