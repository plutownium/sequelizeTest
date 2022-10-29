import Sequelize, { DataTypes, Optional, Sequelize as S, Model, ForeignKey, InferAttributes, InferCreationAttributes } from "sequelize";

import { User, UserId } from "./User";

interface CityAttributes {
    cityId: number;
    longitude: number;
    latitude: number;
    address: string;
}

export class City extends Model<InferAttributes<City>, CityAttributes> {
    public CityId!: number;
    public longitude!: number;
    public latitude!: number;
    public address!: string;

    static initModel(sequelize: S): typeof City {
        return City.init(
            {
                CityId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                longitude: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                latitude: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                address: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize: sequelize,
            },
        );
    }
}

export default City;
