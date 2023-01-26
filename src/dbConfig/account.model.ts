import {DataTypes, Model} from "sequelize";
import {Iaccount} from "../Interfaces/types";
import db from "./db.config";

export class Account extends Model<Iaccount> {
}

Account.init({

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        owner: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },


    }, {
        sequelize: db,
        tableName: 'Account'
    }
)