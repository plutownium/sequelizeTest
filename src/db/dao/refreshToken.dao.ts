import RefreshToken from "../model/RefreshToken";
import User from "../model/User";

//

class RTDAO {
    constructor() {}

    public createToken = async (id: number, t: string) => {
        const later = new Date(); // todo: mk later
        // todo: for which user?
        return await RefreshToken.create(
            {
                token: t,
                isActive: true,
                expires: later,
                userId: id,
            },
            {
                include: [{ association: User, as: "users" }],
            },
        );
    };

    public getAllTokens = async () => {
        const tokens: RefreshToken[] = await RefreshToken.findAll({});
        return tokens;
    };

    public getTokenByToken = async (t: string) => {
        const token: RefreshToken[] = await RefreshToken.findAll({
            where: {
                token: t,
            },
        });
        if (token.length === 0) throw new Error("No token found");
        if (token.length > 1) throw new Error("cats");
        return token[0];
    };

    public getTokenByUserId = (userId: string) => {
        // when this works ur otw
    };
}

export default RTDAO;
