import Sequelize, { DataTypes, Sequelize as S, Model, Optional } from "sequelize";

import sequelizeConnection from "../Database";
import { RefreshToken, RefreshTokenId } from "./RefreshToken";

interface UserAttributes {
    id?: number;
    email: string;
    firstName: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export type UserPk = "id";
export type UserId = User[UserPk];

export type UserOptionalAttributes = "createdAt" | "updatedAt" | "deletedAt";
export type UserCreationAttributes = Optional<UserAttributes, UserOptionalAttributes>;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public email!: string;
    public firstName!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    // User hasMany RefreshTokens via refresh_token_id
    refreshTokens!: RefreshToken[];
    declare getUser: Sequelize.HasManyGetAssociationsMixin<RefreshToken>;
    declare setRefreshToken: Sequelize.HasManySetAssociationsMixin<RefreshToken, RefreshTokenId>;
    declare addRefreshToken: Sequelize.HasManyAddAssociationMixin<RefreshToken, RefreshTokenId>;
    declare addRefreshTokens: Sequelize.HasManyAddAssociationsMixin<RefreshToken, RefreshTokenId>;
    declare createRefreshToken: Sequelize.HasManyCreateAssociationMixin<RefreshToken>;
    declare removeRefreshToken: Sequelize.HasManyRemoveAssociationMixin<RefreshToken, RefreshTokenId>;
    declare removeRefreshTokens: Sequelize.HasManyRemoveAssociationsMixin<RefreshToken, RefreshTokenId>;
    declare hasRefreshToken: Sequelize.HasManyHasAssociationMixin<RefreshToken, RefreshTokenId>;
    declare hasRefreshTokens: Sequelize.HasManyHasAssociationsMixin<RefreshToken, RefreshTokenId>;
    declare countRefreshTokens: Sequelize.HasManyCountAssociationsMixin;

    static initModel(sequelize: S): typeof User {
        return User.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                firstName: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                timestamps: true,
                sequelize: sequelize,
                paranoid: false,
            },
        );
    }
}

export default User;
