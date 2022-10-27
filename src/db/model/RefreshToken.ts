import Sequelize, { DataTypes, Sequelize as S, Model, ForeignKey, InferAttributes, InferCreationAttributes } from "sequelize";

import sequelizeConnection from "../Database";

import { User, UserId } from "./User";

// interface RefreshTokenAttributes {
//     id?: number;
//     token: string;
//     isActive: boolean;
//     expires: Date;
//     createdAt?: Date;
//     updatedAt?: Date;
//     deletedAt?: Date;
// }

export type RefreshTokenPk = "id";
export type RefreshTokenId = RefreshToken[RefreshTokenPk];

export class RefreshToken extends Model<InferAttributes<RefreshToken>, InferCreationAttributes<RefreshToken>> {
    public id!: number;
    public userId!: ForeignKey<number>;
    //   }
    // public id!: number;
    public token!: string;
    public isActive!: boolean;
    public expires!: Date;
    // public userId!: ForeignKey<number>;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    // RefreshToken belongsTo User via refresh_token_owner_id <= lying comment probably
    declare getUser: Sequelize.BelongsToGetAssociationMixin<User>;
    declare setUser: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
    declare createUser: Sequelize.BelongsToCreateAssociationMixin<User>;

    static initModel(sequelize: S): typeof RefreshToken {
        return RefreshToken.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                token: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                isActive: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },
                expires: {
                    type: DataTypes.DATE,
                    allowNull: false,
                },
            },
            {
                timestamps: true,
                sequelize: sequelize,
                paranoid: true,
                modelName: "rt",
            },
        );
    }
}

export default RefreshToken;
