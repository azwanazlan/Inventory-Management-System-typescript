import { DataTypes, Model } from "sequelize";
import { dbContext } from "../Services/database";
import { IAgent } from "./Interfaces";

export class Agent extends Model implements IAgent {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
}

Agent.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  lastName: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
}, {
  tableName: 'agents',
  sequelize: dbContext, // this bit is important
});
