/**
 * Created by tlkzzz on 2016/12/16.
 */
'use strict';

import Base from './base.js';
//分类
export default class extends Base {


    infoAction(){
        return this.display()
    }
    //分页
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
        let result = await this.model('user').limit(pageNumber, pageSize).where({isdel:1}).where(name).countSelect()
        return this.json({total:result.count,rows:result.data})
    }
    //软删除
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