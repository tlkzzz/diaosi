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
  registerAction(){
    return this.display();
  }

  checkregisterAction(){
    //this.success(data)
    return this.fail('注册失败!')
  }
}