import express, { Request, Response } from "express";

import userRouter from "./routes/user";
import rtRouter from "./routes/refreshToken";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.use("/users", userRouter);
app.use("/rt", rtRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
