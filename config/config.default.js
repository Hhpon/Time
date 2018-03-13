'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1517317006900_5066';

  // add your config here
  config.middleware = [];

  exports.mongoose = {
    url: 'mongodb://127.0.0.1/capsule',
    options: {},
  };

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ['http://hhp.im']
  };

  exports.static = {
    prefix: '/'
  }

  // exports.cors = {
  //   // {string|Function} origin: '*',
  //   // {string|Array} 
  //   allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  //   credentials: true
  // };

  return config;
};
