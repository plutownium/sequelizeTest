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
        //
        const users = await User.findAll({});
        return users;
    };

    public getUserByToken = (token: string) => {
        // magic
    };

    public getUserByUserId = async (userId: string) => {
        //
        const user = await User.findOne({ where: { id: userId } });
        return user;
    };
}

export default UserDAO;
