import Sequelize, { DataTypes, Sequelize as S, Model, Optional } from "sequelize";

import sequelizeConnection from "../Database";

import { User, UserId } from "./User";

interface RefreshTokenAttributes {
    id?: number;
    token: string;
    isActive: boolean;
    expires: Date;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export type RefreshTokenPk = "id";
export type RefreshTokenId = RefreshToken[RefreshTokenPk];

export type RefreshTokenOptionalAttributes = "createdAt" | "updatedAt" | "deletedAt";
export type RefreshTokenCreationAttributes = Optional<RefreshTokenAttributes, RefreshTokenOptionalAttributes>;

export class RefreshToken extends Model<RefreshTokenAttributes, RefreshTokenCreationAttributes> implements RefreshTokenAttributes {
    public id!: number;
    public token!: string;
    public isActive!: boolean;
    public expires!: Date;

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
                sequelize: sequelizeConnection,
                paranoid: true,
            },
        );
    }
}

export default RefreshToken;
