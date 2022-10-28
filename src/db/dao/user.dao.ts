import User from "../model/User";

////

class UserDAO {
    constructor() {}

    public createUser = async (email: string, firstName: string) => {
        const u = await User.create({ email: email, firstName: firstName });
        console.log(u, "10rm");
        return u;
    };

    public getAllUsers = async () => {
        const users = await User.findAll({ include: "rt_m" });
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
        const users2 = await User.findAll({ include: ["rt_m"] });
        // console.log(users);
        console.log("===\n===\n===\n");
        console.log(users2);
        console.log("===\n===\n===\n");
        // return [users, users2];
        return users2;
    };
}

export default UserDAO;
