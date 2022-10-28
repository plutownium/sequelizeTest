import RefreshToken from "../model/RefreshToken";
import User from "../model/User";

//

class RTDAO {
    constructor() {}

    public createToken = async (id: number, t: string) => {
        const later = new Date();
        console.log("input id:", id, "11rm");
        // const forUser = await User.findOne({ where: { userId: id } });
        // if (!forUser) throw new Error("No user found for this id");
        const payload = {
            tokenId: 0,
            token: t,
            isActive: true,
            expires: later,
            userId: id,
        };
        const newRT = await RefreshToken.create(payload);
        return newRT;
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
