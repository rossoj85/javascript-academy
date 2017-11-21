'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')


const alien1 = '/photos/alien1.jpg'
const alien2 = '/photos/alien2.jpg'
const alien3= '/photos/alien3.jpg'
const alien4= '/photos/alien4.jpg'
const alien5= '/photos/alien5.gif'
const spock = '/photos/spock.jpg'
const warf = '/photos/warf.jpg'
const quark = '/photos/quark.jpg'


const studentImages = [alien1, alien2, alien3, alien4, alien5, spock, warf, quark  ]

const getRandomImage = () => studentImages[Math.floor(Math.random() * studentImages.length)];





var User = db.define('user', {
  // firstname: Sequelize.STRING,
  // lastname: Sequelize.STRING,
  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true 
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: function () {
      return getRandomImage();
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