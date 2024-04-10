const {Sequelize,DataTypes } = require("sequelize")
const sequelize = require("../config/DB")

const User = sequelize.define('users',{
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    username:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
        onUpdate: Sequelize.fn('CURRENT_TIMESTAMP')
      }
},
{
    timestamps: false,
    underscored: true,
    tableName: 'users'
  })

module.exports= User