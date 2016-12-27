'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {
  /**
   * index action logic
   * @return {} []
   */
  indexAction(){
   
  }
  //注册验证
  async registerchcekAction() {
    let _data = await this.post()
    if(think.isEmpty(_data.name)){
        return this.fail('请输入用户名')
    }
    if(think.isEmpty(_data.email)){
        return this.fail('请输入邮箱')
    }else{
         let arr = await this.model('user').where({email:_data.email,isdel:1}).select()
        if(arr.length>0){
          return this.fail('该邮箱已存在请更换邮箱')
        }
    }
    if(think.isEmpty(_data.phone)){
        return this.fail('请输入手机')
    }else{
        let arr = await this.model('user').where({phone:_data.phone,isdel:1}).select()
        if(arr.length>0){
            return this.fail('该手机已存在请更换手机')
        }
    }
    if(think.isEmpty(_data.pass)){
        return this.fail('请输入密码')
    }else{
        _data.pass = think.md5(_data.pass)
    }
  }
    //登录验证
  async loginsAction() {
    let _data = await this.post()
    if (think.isEmpty(_data.name)) {
      return this.fail('用户名为空')
    }
    if (think.isEmpty(_data.pass)) {
      return this.fail('密码为空')
    }
  }
}