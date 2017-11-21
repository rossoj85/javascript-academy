'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')


// put in some random images here 
const planet1 = '/photos/planet1.jpg'
const planet2 = '/photos/planet2.jpg'
const planet3 = '/photos/planet3.jpg'
const planet4 = '/photos/planet4.jpg'
const planet5 = '/photos/planet5.jpg'
const planet6 = '/photos/planet6.jpg'
const planet7 = '/photos/planet7.jpg'
const images = [ planet1, planet2, planet3, planet4, planet5, planet6, planet7 ]

const getRandomImage = () => images[Math.floor(Math.random() * images.length)];

var Campus = db.define('campus', {
  name: {
  type:Sequelize.STRING,
  allownull: false,
  },
  
    imageUrl: {
      type: Sequelize.STRING,
      defaultValue: function () {
        return getRandomImage();
      }
    }

// }, {
//   defaultScope: {
//     include: [
//       {model: User}
//     ]
//   }

});

module.exports = Campus;
