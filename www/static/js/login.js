/**
 * Created by Administrator on 2016/12/28.
 */
var active
var layer
var activeopen
layui.use('layer', function() { //独立版的layer无需执行这一句
    var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
//触发事件
    active = {
        notice: function(){
            //示范一个公告层
          layer.open({
                type: 2
                ,title: ['登录', 'font-size:18px;'] //不显示标题栏
                , skin: 'layui-layer-molv'  //样式
                ,closeBtn: 1,  //是否显示关闭按钮
                offset: '100px', //坐标
                shadeClose:true  //点击屏蔽层是否关闭弹框
                ,area: ['800px', '350px'],
                anim : 4   //动画0-6
                ,shade: 0.3  //屏蔽层亮度
                ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
                ,moveType: 0 //拖拽模式，0或者1
                ,content: '/home/index/login'
            });
        }
    }
})


