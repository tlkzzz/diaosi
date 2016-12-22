/**
 * Created by tlkzzz on 2016/12/16.
 */
export default class extends think.model.base {

    //查询所有joke 数据
   async getAllJoke(pageNumber,pageSize){
        let data = await this.model('joke').field('DISTINCT j.id as id,j.title as title,j.content as content,j.zan as zan,j.ydu as ydu,j.cai as cai,j.scang as scang,j.plun as plun,j.zfa as zfa,j.ctime as ctime,j.isdel as isdel,'+
         'u.name as uname,u.lpic as ulpic,'+
         'c.name as cname,t.name as tname').alias('j').join({
            table : 'class',
            as : 'c',
            on : ['j.class_id','c.id']
        }).join({
            table : 'tag',
            as : 't',
            on : ['j.tag_id','t.id']
        }).join({
            table : 'user',
            as : 'u',
            on : ['j.user_id','u.id']
        }).where().order(['j.ctime DESC']).limit(pageNumber, pageSize).countSelect()
        return data
    }
    //阅读量++
    async setJokeYduAdd(id){
        return this.model('joke').where({id:id}).increment('ydu',1)
    }
    //赞++
    async setJokeZanAdd(id){
        return this.model('joke').where({id:id}).increment('zan',1)
    }
    //踩++
    async setJokeCaiAdd(id){
        return this.model('joke').where({id:id}).increment('cai',1)
    }
    //收藏++
    async setJokeScangAdd(id){
        return this.model('joke').where({id:id}).increment('scang',1)
    }
    //评论++
    async setJokePlunAdd(id){
        return this.model('joke').where({id:id}).increment('plun',1)
    }
    //转发++
    async setJokeZfaAdd(id){
        return this.model('joke').where({id:id}).increment('zfa',1)
    }

}