/**
 * Created by tlkzzz on 2016/12/15.
 */
'use strict';

import Base from './base.js';
//分类
export default class extends Base {

    infoAction (){
      return  this.display()
    }
    //分页查询
    async listAction(){
        let pageNumber = await this.get('pageNumber')//第几条开始 默认从0条开始
        let pageSize = await this.get('pageSize')  //每页条数
        let name = await this.get('name')//类名称
        // let ionc = await this.get('ionc') //图标名称
        if(name){
            name = {name :name}
        }else{
            name = ''
        }
        let result = await this.model('class').limit(pageNumber, pageSize).where({isdel:1}).where(name).countSelect()
        return this.json({total:result.count,rows:result.data})
    }

    //新增修改页面
    async  fromAction(){
        let id = await  this.get('id')
        if(id){
            this.assign('title','修改分类')
            let cla = await this.model('class').where({id:id}).find()
            this.assign('c',cla)
        }else{
            this.assign('title','添加分类')
            this.assign('c', {id:'',name:'',sort:''})
        }
        return this.display();
    }

    async addeditAction(){
        let cla = await  this.post()
        let user = await this.session('userinfo')
        if(think.isEmpty(cla.id)){
            //添加
            let c = {
                cuser : user.name,
                ctime : think.datetime(),
            }
            think.extend(cla,c)
            //新增
            let count = await this.model('class').add(cla)
            if(count>0){
                return this.json({s:1,msg:'新增成功!'})
            }else{
                return this.json({s:2,msg:'新增失败!'})
            }
        }else{
            //修改
            let count = await this.model('class').where({id:cla.id}).update({cla,etime:think.datetime()})
            if(count>0){
                return this.json({s:1,msg:'修改成功!'})
            }else{
                return this.json({s:2,msg:'修改失败!'})
            }
        }
    }
   async delAction(){
       //将字符串转换为数组
       let id = await this.get('id').split(',')
       // let count = await this.model('class').where({id:id}).delete()
       let count = await this.model('class').where({id:id}).update({isdel:0})
       if(count>0){
           return this.json({s:1,msg:'删除成功!'})
       }else{
           return this.json({s:2,msg:'删除失败!'})
       }
   }
}