import { Sequelize } from "sequelize";
import { User } from "./User";
import { RefreshToken } from "./RefreshToken";

function initModels(s: Sequelize) {
    const u = User.initModel(s);
    const rt = RefreshToken.initModel(s);

    u.hasMany(rt);

    rt.belongsTo(u);

    return { user: u, refreshToken: rt };
}

export default initModels;
