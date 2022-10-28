import Sequelize, { DataTypes, Optional, Sequelize as S, Model, ForeignKey, InferAttributes, InferCreationAttributes } from "sequelize";

import { User, UserId } from "./User";

interface RefreshTokenAttributes {
    tokenId: number;
    token: string;
    isActive: boolean;
    expires: Date;
    userId?: number;
}

type RefreshTokenCreationAttributes = Optional<RefreshTokenAttributes, "tokenId">;

export class RefreshToken extends Model<InferAttributes<RefreshToken>, RefreshTokenCreationAttributes> {
    public tokenId!: number;
    public userId!: ForeignKey<User["userId"]>;
    public token!: string;
    public isActive!: boolean;
    public expires!: Date;

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
                sequelize: sequelize,
                modelName: "rt",
            },
        );
    }
}

export default RefreshToken;

// declare getUser: Sequelize.BelongsToGetAssociationMixin<User>;
// declare setUser: Sequelize.BelongsToSetAssociationMixin<User, UserId>;
// declare createUser: Sequelize.BelongsToCreateAssociationMixin<User>;
