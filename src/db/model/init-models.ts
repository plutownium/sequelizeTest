import { Sequelize, DataTypes } from "sequelize";
import { User } from "./User";
import { RefreshToken } from "./RefreshToken";

function initModels(s: Sequelize) {
    const u = User.initModel(s);
    const rt = RefreshToken.initModel(s);

    u.hasMany(rt, {
        foreignKey: {
            name: "userId",
            // type: DataTypes.UUID,
        },
    });

    rt.belongsTo(u, {
        foreignKey: {
            name: "RTId",
            // type: DataTypes.UUID,
        },
    });

    return { user: u, refreshToken: rt };
}

export default initModels;
