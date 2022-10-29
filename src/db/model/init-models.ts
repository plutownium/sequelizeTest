import { Sequelize, DataTypes } from "sequelize";
import { User } from "./User";
import { RefreshToken } from "./RefreshToken";

function initModels(s: Sequelize) {
    const u = User.initModel(s);
    const rt = RefreshToken.initModel(s);

    u.hasMany(rt, {
        foreignKey: "userId",
        as: "their_refresh_tokens",
    });

    rt.belongsTo(u, {
        foreignKey: 'userId',
        as: "belongs_to_user",
    });

    return { user: u, refreshToken: rt };
}

export default initModels;
