import Sequelize, {
    DataTypes,
    Optional,
    Sequelize as S,
    Model,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyRemoveAssociationMixin,
} from "sequelize";
import Apartment from "./Apartment";

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

    declare getApartments: HasManyGetAssociationsMixin<Apartment>;
    declare addApartment: HasManyAddAssociationMixin<Apartment, number>;
    declare removeApartment: HasManyRemoveAssociationMixin<Apartment, number>;

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
