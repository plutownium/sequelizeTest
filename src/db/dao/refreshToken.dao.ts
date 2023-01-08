import RefreshToken from "../model/RefreshToken";
import User from "../model/User";

//

class RTDAO {
    constructor() {}

    public createToken = async (userId: number, tokenString: string) => {
        const later = new Date();
        const newRT = await RefreshToken.create({ token: tokenString, isActive: true, expires: later, userId: userId });
        return newRT;
    };

    public getAllTokens = async () => {
        const tokens: RefreshToken[] = await RefreshToken.findAll({ include: ["belongs_to_user"] });
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

    public getTokenByUserId = async (userId: number) => {
        // when this works ur otw
        const token = await RefreshToken.findAll({ where: { userId: userId }, include: ["belongs_to_user"] });
        return token;
    };
}

export default RTDAO;
