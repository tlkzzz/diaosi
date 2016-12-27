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
}