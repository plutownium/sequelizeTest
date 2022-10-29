import Sequelize, { DataTypes, Optional, Sequelize as S, Model, ForeignKey, InferAttributes, InferCreationAttributes } from "sequelize";
import City from "./City";


export type ApartmentPk = "apartmentId";
export type ApartmentId = Apartment[ApartmentPk];

interface ApartmentAttributes {
    apartmentId: number;
    longitude: number;
    latitude: number;
    address: string;
    cityId?: number;
}

type ApartmentCreationAttributes = Optional<ApartmentAttributes, "apartmentId">;

export class Apartment extends Model<InferAttributes<Apartment>, ApartmentCreationAttributes> {
    public apartmentId!: number;
    public longitude!: number;
    public latitude!: number;
    public address!: string;
    public cityId!: ForeignKey<City["cityId"]>;

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
                modelName: "apartment"
            },
        );
    }
}

export default Apartment;
