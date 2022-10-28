import User from "../model/User";

////

class UserDAO {
    constructor() {}

    public createUser = async (email: string, firstName: string) => {
        const u = await User.create({ email: email, firstName: firstName });
        return u;
    };

    public getAllUsers = async () => {
        const users = await User.findAll({ include: "their_refresh_tokens" });
        return users;
    };

    public getUserByToken = (token: string) => {
        // magic
    };

    public getUserByUserId = async (userId: string) => {
        //
        const user = await User.findOne({ where: { userId: userId } });
        return user;
    };

    public getUsersWithTokens = async () => {
        // const users = await User.findAll({ include: ["rt_id"] });
        const users2 = await User.findAll({ include: ["their_refresh_tokens"] });
        return users2;
    };
}

export default UserDAO;
