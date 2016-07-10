/**
 * Created by Alice on 2016/5/15.
 */


Function.prototype.myBind=function myBind(context){
    // function fn(num1,num2)
    // {
    //     return num1+num2;
    // }
    //fn.myBind(obj,100,200);
    var outerArg=Array.prototype.slice.call(arguments,1);//myBind��ĵڶ��������Ժ�,Ҳ���������100,200

    var _this=this;
    /*if("bind" in Function.prototype)
     {
     return _this.bind.apply(_this,outerArg.unshift(context));//��������֧��bind
     }*/
    return function(){
        var innerArg=Array.prototype.slice.call(arguments,0);//�����������e
        _this.apply(context,outerArg.concat(innerArg));
    }
};


//�¼���ԭ��this  ˳��    �����ظ���  
//����DOM2���¼��󶨵ļ��������⣨�󶨷�����
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

    //����ظ�����  ��������Ҫ��ӵ�fn�Ļ��Ͳ������
    for(var i=0;i<ary.length;i++)
    {
        if(ary[i].photo==fn)
        {
            return;
        }
    }

    var tempFn=fn.myBind(ele);//Ԥ�����൱�ڻ�ױ
    tempFn.photo=fn;//����Ƭ  �Ƴ���ʱ����
    ary.push(tempFn);//�Լ��������з�һ�ݣ���Ϊ�����Ƴ���ʱ���ȥ�������ң�������ȥ�����¼�������



    ele.attachEvent("on"+type,tempFn);//�ı�thisָ�����⣬����call��bind��Ȼ��bind�����ݣ�����Ҫ�Լ�д���ݵ�myBind


    /*��ױ�����Ѿ����this���⣬���ǰ󶨶��֮����Ҫ�Ƴ�ĳһ���������Ƴ���ʱ���Ƴ���ʼ�������ǰ󶨵����һ����������Ϊȫ�ֵı���tempFnֻ�ܴ洢�����Ǹ�
     ���������1.���ȴ���һ����ʱ������
     2.������ÿһ�λ�ױ��ĺ����������浽�¼����У���Ҫ���Լ��������д洢һ�ݣ���������һ����Ƭ
     3.�Ƴ���ʱ������֮ǰ����Ƭ�����Լ��������ҵ�֮ǰ������



     */





}

//ʵ��DOM2�Ƴ��� �������������
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
                ele.detachEvent("on"+type,ary[i]);//���¼��н����Ƴ�
                ary.splice(i,1);//��������Ҳ�Ƴ�  ��д���еĻ� ͬһ�¼����ٰ�ͬһfn�����Ļ��Ͱ󶨲�����
                return;

            }
        }
    }

}




//on ���ie������¼��ϵķ�����������ֵ�ִ��˳����ҵ�����
//��ie���Դ����¼�ģʽ�񶨵����Լ�дһ���¼�ģʽ�����ٰѷ���ֱ�Ӱ󶨵��¼��ϣ����ǰ���Ҫ�󶨵ķ������ȱ��浽�¼���(�����)�У����¼�������ʱ����һ��run�������������飬����ִ�б��������������ķ�����Ҳ����˵��ָ�����¼��ϵ���run����������һ��run�����Ͳ�������

//on-������Ҫ�󶨵����з������ηŵ��Զ�����¼�����
function on(ele,type,fn){

    if(!ele["myEvent"+type])
    {
        ele["myEvent"+type]=[];
    }
    var ary=ele["myEvent"+type];
    //�����ظ���
    for(var i=0;i<ary.length;i++)
    {
        if(ary[i]==fn)
        {
            return;
        }
    }
    ary.push(fn);
    //�¼������󶨵���run����   
    // on run off���õ�bind��  û�õ�unbind �������ǿ��Խ����������д������
    bind(ele,type,run);
}

//off-�����Զ�����¼������Ƴ�������Ҫ�Ƴ��ķ���
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

//run-�����Ȱ�run�������õ��¼����У�����Ϊ������runִ�е�ʱ�������ٰ��Զ����¼����е����з�������ִ��
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
                curFn.call(this,e);//�ı�fn���this
            }
            else{
                ary.splice(i,1);
                i--;
            }
        }

    }

}