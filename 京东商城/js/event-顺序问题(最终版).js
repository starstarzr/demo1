/**
 * Created by Alice on 2016/5/15.
 */


Function.prototype.myBind=function myBind(context){
    // function fn(num1,num2)
    // {
    //     return num1+num2;
    // }
    //fn.myBind(obj,100,200);
    var outerArg=Array.prototype.slice.call(arguments,1);//myBind里的第二参数及以后,也就是上面的100,200

    var _this=this;
    /*if("bind" in Function.prototype)
     {
     return _this.bind.apply(_this,outerArg.unshift(context));//如果浏览器支持bind
     }*/
    return function(){
        var innerArg=Array.prototype.slice.call(arguments,0);//匿名函数里的e
        _this.apply(context,outerArg.concat(innerArg));
    }
};


//事件的原则：this  顺序    不能重复绑定  
//处理DOM2级事件绑定的兼容性问题（绑定方法）
function bind(ele,type,fn){
    if("addEventListener" in window)
    {
        ele.addEventListener(type,fn,false);
        return;
    }




    if(!ele["myBind"+type])//
    {
        ele["myBind"+type]=[];
    }
    var ary=ele["myBind"+type];//

    //解决重复问题  数组里有要添加的fn的话就不再添加
    for(var i=0;i<ary.length;i++)
    {
        if(ary[i].photo==fn)
        {
            return;
        }
    }

    var tempFn=fn.myBind(ele);//预处理相当于化妆
    tempFn.photo=fn;//贴照片  移除的时候用
    ary.push(tempFn);//自己的容器中放一份，因为我们移除的时候得去容器中找，而不能去内置事件池中找



    ele.attachEvent("on"+type,tempFn);//改变this指向问题，不用call用bind，然而bind不兼容，所以要自己写兼容的myBind


    /*化妆部分已经解决this问题，但是绑定多个之后想要移除某一个方法，移除的时候，移除的始终是我们绑定的最后一个方法，因为全局的变量tempFn只能存储最后的那个
     解决方法：1.首先创建一个临时的容器
     2.把我们每一次化妆后的函数不仅仅存到事件池中，还要往自己的容器中存储一份，别忘了贴一张照片
     3.移除的时候，拿着之前的照片，到自己的容器找到之前的样子



     */





}

//实现DOM2移除绑定 兼容所有浏览器
function unbind(ele,type,fn){
    if("removeEventListener" in window)
    {
        ele.removeEventListener(type,fn,false);
        return;
    }


    var ary=ele["myBind"+type];//
    if(ary)//
    {
        for(var i=0;i<ary.length;i++)
        {

            if(ary[i].photo==fn)
            {
                ele.detachEvent("on"+type,ary[i]);//在事件中将其移除
                ary.splice(i,1);//在数组里也移除  不写这行的话 同一事件上再绑定同一fn方法的话就绑定不上了
                return;

            }
        }
    }

}




//on 解决ie里绑定在事件上的方法过多而出现的执行顺序混乱的问题
//把ie中自带的事件模式否定掉，自己写一套事件模式，不再把方法直接绑定到事件上，而是把需要绑定的方法事先保存到事件池(程序池)中，当事件触发的时候，由一个run方法来遍历数组，并且执行保存在这个数组里的方法，也就是说戒指绑定在事件上的是run方法，就这一个run方法就不会乱序

//on-》把需要绑定的所有方法依次放到自定义的事件池中
function on(ele,type,fn){

    if(!ele["myEvent"+type])
    {
        ele["myEvent"+type]=[];
    }
    var ary=ele["myEvent"+type];
    //避免重复绑定
    for(var i=0;i<ary.length;i++)
    {
        if(ary[i]==fn)
        {
            return;
        }
    }
    ary.push(fn);
    //事件真正绑定的是run方法   
    // on run off里用到bind了  没用到unbind 所以我们可以将五个方法改写成三个
    bind(ele,type,run);
}

//off-》在自定义的事件池中移除我们需要移除的方法
function off(ele,type,fn){
    var ary=ele["myEvent"+type];
    if(ary){
        for(var i=0;i<ary.length;i++)
        {
            if(ary[i]==fn)
            {
                //ary[i].splice(i,1);
                ary[i]=null;
                return;
            }
        }

    }

}

//run-》首先把run放在内置的事件池中，当行为触发，run执行的时候，我们再把自定义事件池中的所有方法依次执行
function run(e){
    e=e||window.event;
    if(window.event)
    {
        e.target= e.srcElement;
        e.pageX= e.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft);
        e.pageY= e.clientY+(document.documentElement.scrollTop||document.body.scrollTop);
        e.preventDefault=function(){
            e.returnValue=false;
        };
        e.stopPropagation=function(){
            e.cancelBubble=true;
        }
    }

    var ary=this["myEvent"+ e.type];
    if(ary){
        for(var i=0;i<ary.length;i++)
        {
            var curFn=ary[i];
            if(typeof curFn=="function")
            {
                curFn.call(this,e);//改变fn里的this
            }
            else{
                ary.splice(i,1);
                i--;
            }
        }

    }

}