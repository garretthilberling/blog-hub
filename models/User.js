const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(pwInput) {
        return bcrypt.compareSync(pwInput, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [7] //password with a minimum length of 7 characters
              }
        }
    },
    { 
        hooks: {
          async beforeCreate(newUser) {
            newUser.password = await bcrypt.hash(newUser.password, 10);
              return newUser;
          },
          async beforeUpdate(updtUser) {
            updtUser.password = await bcrypt.hash(updtUser.password, 10);
              return updtUser;
          }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;