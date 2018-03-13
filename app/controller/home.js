'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }

  async getUserInfo() {

    const ctx = this.ctx;
    var code = ctx.query.code;

    var appid = 'wxc39406c81ec77dd3';
    var secret = '1302e3932890d8108cf960d23ae7d4d0';

    var resCode = await ctx.curl('https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + appid + '&secret=' + secret + '&code=' + code + '&grant_type=authorization_code', {
      dataType: 'json'
    });

    var obj = resCode.data;
    var access_token = obj.access_token;
    var openid = obj.openid;

    var resPersonal = await ctx.curl('https://api.weixin.qq.com/sns/userinfo?access_token=' + access_token + '&openid=' + openid + '&lang=zh_CN', {
      dataType: 'json'
    });

    var msgPersonal = resPersonal.data;

    ctx.body = msgPersonal;
  }

  async subMsg() {
    const ctx = this.ctx;
    var calendar = ctx.request.body.calendar;
    var accepter = ctx.request.body.accepter;
    var msgStyle = ctx.request.body.msgStyle;
    var wcNum = ctx.request.body.wcNum;
    var Xcontent = ctx.request.body.Xcontent;
    var nickname = ctx.request.body.nickname;
    var openid = ctx.request.body.openid;
    var todayTime = ctx.request.body.todayTime;
    console.log(todayTime);

    const Capsule = ctx.model.Capsule;
    var capsule = new Capsule({
      calendar: calendar,
      accepter: accepter,
      msgStyle: msgStyle,
      wcNum: wcNum,
      content: Xcontent,
      nickname: nickname,
      openid: openid,
      todayTime: todayTime,
      aleady: 0
    });

    await capsule.save();

    ctx.body = '提交成功';
  }

  async getOnce() {
    const ctx = this.ctx;
    var openid = ctx.request.body.openid;
    const Capsule = ctx.model.Capsule;

    const doc = await new Promise((resolve, reject) => {
      Capsule.find({ 'openid': openid }, (err, doc) => {
        if (err) {
          reject(err);
        }
        resolve(doc);
      });
    })

    ctx.body = doc;
  }

  async apply() {
    const ctx = this.ctx;

    var applyMsg = ctx.request.body;
    console.log(applyMsg);

    var url = applyMsg.url;
    var urlSex = applyMsg.urlSex;
    var nickname = applyMsg.nickname;
    var sex = applyMsg.sex;
    var applyCon = applyMsg.applyCon;
    var grade = applyMsg.grade;
    var openid = applyMsg.openid;


    const Capsule = ctx.model.Capsule;
    const doc = await new Promise((resolve, reject) => {
      Capsule.find({}, (err, doc) => {
        if (err) {
          reject(err);
        }
        resolve(doc);
      });
    });

    const array = await new Promise((resolve, reject) => {
      var result = false;
      var index = 0;

      for (var i = 0; i < doc.length; i++) {

        if (!!doc[i].aleady) {
          continue;
        } else {

          if (doc[i].openid === openid) {
            continue;
          } else {
            result = true;
            index = i;
            var id = doc[i].id;
            Capsule.update({ _id: id }, { aleady: 1 }, (err, res) => {
              console.log(res);
            });
            break;
          }
        }
      }
      resolve([index, result, id]);
    });


    const Apply = ctx.model.Apply;
    var apply = new Apply({
      url: url,
      urlSex: urlSex,
      nickname: nickname,
      sex: sex,
      applyCon: applyCon,
      grade: grade,
      openid: openid,
      onceId: array[2]
    });
    await apply.save();


    var index = array[0];
    if (array[1]) {
      ctx.body = doc[index];
    } else {
      ctx.body = '胶囊没有剩余了！';
    }

  }

  async getApply() {
    const ctx = this.ctx;
    var id = ctx.request.body.id;

    const Capsule = ctx.model.Capsule;
    ctx.body = await new Promise((resolve, reject) => {
      Capsule.find({ _id: id }, (err, doc) => {
        if (err) {
          reject(err);
        }
        console.log(doc[0]);
        resolve(doc[0]);
      });
    });
  }

  async applyerMsg() {
    const ctx = this.ctx;
    var userId = ctx.request.body.userId;
    console.log(userId);

    const Apply = ctx.model.Apply;

    ctx.body = await new Promise((resolve, rejsct) => {
      Apply.find({ onceId: userId }, (err, res) => {
        if (err) {
          rejsect(err);
        }
        resolve(res);
      })
    })
  }
}

module.exports = HomeController;
