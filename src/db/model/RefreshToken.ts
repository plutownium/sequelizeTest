import Sequelize, { DataTypes, Optional, Sequelize as S, Model, ForeignKey, InferAttributes, InferCreationAttributes } from "sequelize";

import sequelizeConnection from "../Database";

import { User, UserId } from "./User";

interface RefreshTokenAttributes {
    tokenId: number;
    email: string;
    firstName: string;
}

type UserCreationAttributes = Optional<RefreshTokenAttributes, "tokenId">;

export type RefreshTokenPk = "tokenId";
export type RefreshTokenId = RefreshToken[RefreshTokenPk];

export class RefreshToken extends Model<InferAttributes<RefreshToken>, InferCreationAttributes<RefreshToken>> {
    public tokenId!: number;
    public userId!: ForeignKey<User["userId"]>;
    //   }
    // public id!: number;
    public token!: string;
    public isActive!: boolean;
    public expires!: Date;

    declare getUser: Sequelize.BelongsToGetAssociationMixin<User>;
    declare setUser: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
    declare createUser: Sequelize.BelongsToCreateAssociationMixin<User>;

    static initModel(sequelize: S): typeof RefreshToken {
        return RefreshToken.init(
            {
                tokenId: {
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
