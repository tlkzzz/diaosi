'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display()
  }
  infoAction(){
      return this.display()
  }
  //登录页面
  loginAction(){
    return this.display()
  }
  //登录
 async submitAction(){
    let user = await this.post()
    let _user = await this.model('suser').where({name :user.name,pass : think.md5(user.password)}).find()
       if(think.isEmpty(_user)){//为空
           return this.json({s:0,msg:'账号或密码错误'})
            }else {
           if (_user.isdel == 1) {//是否有效
               await this.model('suser').where({name:user.name}).update({ltime:think.datetime(new Date, "YYYYMMDDHHmmss")})
                 _user.pass=''
               await this.session('userinfo',_user)
               return this.json({s:1,msg:'登录成功'})
           } else {
           return this.json({s: 2, msg: '账号无效'})
       }
       }

  }
}