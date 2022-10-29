import Sequelize, { DataTypes, Optional, Sequelize as S, Model, ForeignKey, InferAttributes, InferCreationAttributes } from "sequelize";

import { User, UserId } from "./User";

interface ApartmentAttributes {
    apartmentId: number;
    longitude: number;
    latitude: number;
    address: string;
    cityId?: number;
}

type ApartmentCreationAttributes = Optional<ApartmentAttributes, "cityId">;

export class Apartment extends Model<InferAttributes<Apartment>, ApartmentCreationAttributes> {
    public apartmentId!: number;
    public longitude!: number;
    public latitude!: number;
    public address!: string;
    public cityId!: ForeignKey<User["cityId"]>;

    static initModel(sequelize: S): typeof Apartment {
        return Apartment.init(
            {
                apartmentId: {
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

export default Apartment;
