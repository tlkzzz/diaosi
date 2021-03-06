'use strict';

export default class extends think.controller.base {
  /**
   * some base method in here
   */
  /**
   *  前置方法
   */
  async __before() {
    await this.isUser() //登录验证
    await this.getConfig()//
    await this.isLogin()  //是否登陆
  }
  //是否登陆
 async isUser(){
    let us = await this.session('user')
    if (think.isEmpty(us)){
      return this.assign('us',null)
    }else{
      return this.assign('us', us)
    }
  }
  //设置全局路径前置
  getConfig(){
    let web ={
      static : '',
      url : ''
    }
    this.assign('_web',web);
  }
    //是否登陆
  async  isLogin(){
        let action =await  this.http.action
      if(action == 'savejoke'){
          let us = await this.session('user')
          if (think.isEmpty(us)){
              return this.fail(10001,'未登录,请登录')
          }
      }
    }
}