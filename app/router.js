'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/index', controller.home.index);
  router.post('/subMsg', controller.home.subMsg);
  router.get('/getUserInfo',controller.home.getUserInfo);
  router.post('/getOnce',controller.home.getOnce);
  router.post('/apply',controller.home.apply);
  router.post('/getApply',controller.home.getApply);
  router.post('/applyerMsg',controller.home.applyerMsg);
};
