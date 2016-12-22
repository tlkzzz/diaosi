'use strict';

export default class extends think.controller.base {
  /**
   * some base method in here
   */

  /**
   *  前置方法
   */
  async __before() {
    await this.getConfig()
    await this.isLogin() //登录验证
  }

  //后置方法


  //是否登录
  async isLogin(){
    let action =await this.http.action
    if(action == 'login' || action == 'submit'){
    }else {
      let userinfo = await this.session('userinfo')
      if(think.isEmpty(userinfo)){
        return  this.redirect('/admin/index/login')
      }else{
        //访问日志
        let http =await this.http
        let log={
          host : http.host, //title
          time : think.datetime() , //请求时间戳
          url : http.url, //请求url
          method : http.method, //访问方法类型
          version : http.version,//版本
          user : userinfo.name,  //操作人名称
          param : http.query,  //请求参数
        }
        await this.model('syslog').add(log);
      }
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