'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')


var User = db.define('user', {
  // firstname: Sequelize.STRING,
  // lastname: Sequelize.STRING,
  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true 
    }
  }
},/*{
  getterMethods: {
    fullName(){
      return this.firstname+' '+this.lastname
    }
  },
  setterMethods:{
    fullName(value) {
      const names = value.split(' ');

      this.setDataValue('firstname', names.slice(0, -1).join(' '));
      this.setDataValue('lastname', names.slice(-1).join(' '));
    },
  }
}*/)

module.exports= User;