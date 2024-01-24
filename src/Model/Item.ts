import { DataTypes, Model } from "sequelize";
import { dbContext } from "../Services/database";
import { IItem } from "./Interfaces";

export class Item extends Model implements IItem {
  public id!: number;
  public name!: string;
  public price!: number;
  public quantity!: number;
  public description!: string;
  public category!: string;
}

Item.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED, // you need to specify the correct type
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    description: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    category: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
  },
  {
    tableName: "items",
    sequelize: dbContext,
  }
);
