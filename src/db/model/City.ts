import Sequelize, { DataTypes, Optional, Sequelize as S, Model, ForeignKey, InferAttributes, InferCreationAttributes } from "sequelize";

// export type CityPk = "cityId";
// export type CityId = City[CityPk];

interface CityAttributes {
    cityId: number;
    longitude: number;
    latitude: number;
    address: string;
}

export type CityCreationAttributes = Optional<CityAttributes, "cityId">;
export class City extends Model<InferAttributes<City>, CityCreationAttributes> {
    public cityId!: number;
    public longitude!: number;
    public latitude!: number;
    public address!: string;

    static initModel(sequelize: S): typeof City {
        return City.init(
            {
                cityId: {
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
                modelName: "city",
            },
        );
    }
}

export default City;
