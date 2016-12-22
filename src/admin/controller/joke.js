/**
 * Created by tlkzzz on 2016/12/16.
 */
'use strict';

import Base from './base.js';
//段子
export default class extends Base {


    infoAction(){
        return this.display()
    }
        //joke分页查询
  async listAction(){
            let pageNumber = await  this.get('pageNumber')//第几条开始 默认从0条开始
            let pageSize = await this.get('pageSize')  //每页条数
            let result = await this.model('joke').getAllJoke(pageNumber,pageSize)
            return this.json({total:result.count,rows:result.data})
        }

}