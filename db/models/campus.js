'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')


// put in some random images here 
const images = [
  'http://www.nasa.gov/sites/default/files/images/729223main_728322main_messenger_orbit_image20130218_2_full_full_full.jpg',
  'https://cdn.theatlantic.com/assets/media/img/mt/2015/10/triple/lead_960.jpg?1444863760',
  'https://exoplanets.nasa.gov/system/feature_items/images/14_hotJupiter320.jpg',
  'http://i.dailymail.co.uk/i/pix/2016/05/04/18/33D6751900000578-3573624-Several_planets_including_Kepler_10b_and_Kepler_78b_have_been_co-a-89_1462382802247.jpg'
]

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
