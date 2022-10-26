import User from "../model/User";

////

class UserDAO {
    constructor() {}

    public createUser = async (email: string, firstName: string) => {
        return await User.create({ email, firstName }); // q: does it receive an id?
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
