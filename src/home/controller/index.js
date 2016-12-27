'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display();
  }
  infoAction(){
    return this.display();
  }

  myAction(){
    return this.display();
  }
  //关注
  concernAction(){
    return this.display();
  }
  //粉丝
  fansAction(){
    return this.display();
  }
  //注册
 async registerAction(){
    return this.display();
  }

  // checkregisterAction(){
  //   //this.success(data)
  //   return this.fail('注册失败!')
  // }
  //登录
    loginAction(){
        return this.display()
    }
    //注册
   async registerchcekAction(){
       let _data = await this.post()
       let t ={
           ztime : think.datetime(),
       }
        think.extend(_data,t)
        let userid = await this.model('user').add(_data)
        if(!think.isEmpty(userid)){
            let user = await this.model('user').where({id:userid,isdel:1}).find()
            await this.session('user',user)
            let data = {'msg':'注册成功'}
            return this.success(data)
        }
    }

    //注销
    async outloginAction(){
        await this.session()
        return this.redirect('/home/index/index')
    }

    //登录
    async loginsAction(){
       let _data = await this.post()
        //is 手机号
          let p = /^1[34578]\d{9}$/
        //email
          let e = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/
        if(p.test(_data.name)){
            let user = await this.model('user').where({phone:_data.name,pass:think.md5(_data.pass),isdel:1}).find()
            if (!think.isEmpty(user)){
                await this.session('user',user)
                let data = {'msg':'登录成功'}
                return this.success(data)
            }else{
                return this.fail('手机号码或密码错误')
            }
        }else if(e.test(_data.name)){
            let user = await this.model('user').where({email:_data.name,pass:think.md5(_data.pass),isdel:1}).find()
            if (!think.isEmpty(user)){
                await this.session('user',user)
                let data = {'msg':'登录成功'}
                return this.success(data)
            }else{
                return this.fail('邮箱或密码错误')
            }
        }else {
            let user = await this.model('user').where({name:_data.name,pass:think.md5(_data.pass),isdel:1}).find()
            if (!think.isEmpty(user)){
                await this.session('user',user)
                let data = {'msg':'登录成功'}
                await this.model('user').where({id:user.id}).update({ltime:think.datetime()})
                return this.success(data)
            }else{
               return this.fail('用户名或密码错误')
            }
        }
    }
    //add段子
    addjokeAction(){
        return this.display()
    }
    //add图片
    addjokeimgAction(){
        return this.display()
    }
    //bootstrap-fileinput上传图片控件
    async fileupAction(){
        var _this = this
        var file = this.file("files") //三个重要属性 originalFilename,path,size,
        console.log(file)
        var fs = require("fs") //引入fs处理文件
        //创建上传资源目录文件
        think.mkdir(think.RESOURCE_PATH+"/static/upload");
        let time = think.datetime(new Date, "YYYYMMDDHHmmss"); //文件名称
        let type = file.originalFilename
        let t=  type.split('.')[1]
        let filename = time+'.'+t //文件名称+后缀
        await  fs.rename(file.path, think.RESOURCE_PATH+"/static/upload/"+filename, function(err) {
            if(err){
                console.log('上传失败')
                return  _this.fail('上传文件失败')
            }else{
                let path = "/static/upload/"+filename
                console.log('上传成功')
                var data ={path:path,msg:'上传成功'}
                return _this.success(data)
            }

        })
    }
}