/**
 * Created by tlkzzz on 2016/12/15.
 */

'use strict';

import Base from './base.js';
//分类
export default class extends Base {

    infoAction(){
        return this.display()
    }

   async listAction(){
        let pageNumber = await this.get('pageNumber')//第几条开始 默认从0条开始
        let pageSize = await this.get('pageSize')  //每页条数
        let name = await this.get('name')//类名称
        if(name){
            name = {name :name}
        }else{
            name = ''
        }
        let result = await this.model('tag').limit(pageNumber, pageSize).where({isdel:1}).where(name).countSelect()
        return this.json({total:result.count,rows:result.data})
    }


   async fromAction(){
        let id = await this.get('id')
        if(think.isEmpty(id)){//新增
            this.assign('title','标签新增')
            let tag = {
                id : '',
                name : '',
                color : '',
                sort :'',
            }
            this.assign('tag', tag)
            return this.display()
        }else{
            let tag = await this.model('tag').where({id:id}).find()
            this.assign('title','标签修改')
            this.assign('tag', tag)
            return this.display()
        }
    }

    async addeditAction(){
        let tag = await this.post()
        let user = await this.session('userinfo')
        if(think.isEmpty(tag.id)){//新增
           let t ={
               ctime : think.datetime(),
               cuser : user.name
           }
            think.extend(tag,t)
            let count = await this.model('tag').add(tag)
            if(count>0){
                return this.json({s:1,msg:'新增成功'})
            }else{
                return this.json({s:2,mag:'新增失败'})
            }
        }else{
            let count = await this.model('tag').where({id:tag.id}).update({tag,etime:think.datetime()})
            if(count>0){
                return this.json({s:1,msg:'修改成功'})
            }else{
                return this.json({s:2,mag:'修改失败'})
            }
        }
    }

   async delAction(){
        let id = await this.get('id').split(',')
        let count = await this.model('tag').where({id:id}).update({isdel:0})
        if(count>0){
            return this.json({s:1,msg:'删除成功'})
        }else{
            return this.json({s:2,mag:'删除失败'})
        }
    }


}
