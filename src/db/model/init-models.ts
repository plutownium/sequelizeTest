import { Sequelize, DataTypes } from "sequelize";
import { User } from "./User";
import { RefreshToken } from "./RefreshToken";
import City from "./City";
import Apartment from "./Apartment";

function initModels(s: Sequelize) {
    const u = User.initModel(s);
    const rt = RefreshToken.initModel(s);
    const city = City.initModel(s);
    const apartment = Apartment.initModel(s);

    u.hasMany(rt, {
        foreignKey: "userId",
        as: "their_refresh_tokens",
    });
    rt.belongsTo(u, {
        foreignKey: 'userId',
        as: "belongs_to_user",
    });

    city.hasMany(apartment);
    rt.belongsTo(city);

    return { user: u, refreshToken: rt };
}

export default initModels;
