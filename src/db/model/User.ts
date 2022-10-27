import Sequelize, { DataTypes, Sequelize as S, Model, Optional, InferAttributes, InferCreationAttributes } from "sequelize";

import { RefreshToken, RefreshTokenId } from "./RefreshToken";

export type UserPk = "userId";
export type UserId = User[UserPk];

interface UserAttributes {
    userId: number;
    email: string;
    firstName: string;
}

type UserCreationAttributes = Optional<UserAttributes, "userId">;

export class User extends Model<InferAttributes<User>, UserCreationAttributes> {
    public userId!: number;
    public email!: string;
    public firstName!: string;

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
                userId: {
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
                modelName: "user",
            },
        );
    }
}

export default User;
