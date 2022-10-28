import { Sequelize, DataTypes } from "sequelize";
import { User } from "./User";
import { RefreshToken } from "./RefreshToken";

function initModels(s: Sequelize) {
    const u = User.initModel(s);
    const rt = RefreshToken.initModel(s);

    console.log("init models!");
    u.hasMany(rt, {
        // foreignKey: {
        //     name: "userId",
        //     // type: DataTypes.UUID,
        // },
        foreignKey: "userId",
        as: "user_id",
    });

    rt.belongsTo(u, {
        // foreignKey: {
        //     name: "RTId",
        //     // type: DataTypes.UUID,
        // },
        foreignKey: "RTId",
        as: "rt_id",
    });

    return { user: u, refreshToken: rt };
}

export default initModels;
