import { DataTypes, Model } from "sequelize";
import { dbContext } from "../Services/database";
import { IEmployee } from "./Interfaces";

export class Employee extends Model implements IEmployee {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
}
  
Employee.init({
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
  // Add other properties as needed (e.g., email, jobTitle, etc.)
}, {
  tableName: 'employees',
  sequelize: dbContext, // this bit is important
});
  
