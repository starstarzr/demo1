/**
 * Created by Alice on 2016/4/20.
 */
//    单例模式

var utils = (function(){//作用域不销毁
//把类数组转换成数组
    /**
     *
     * @param similarArray 要转换的类数组
     * @returns {Array}  转换好的数组
     */
    var flag="getComputedStyle" in window;
    return {
        listToArray: function (similarArray) {
            var a = [];
            try {
                a = Array.prototype.slice.call(similarArray);
            }
            catch (e) {
                for (var i = 0; i < similarArray.length; i++) {
                    a.push(similarArray[i]);
                }

            }
            return a;


        },

//把ＪＳＯＮ格式的字符串转换成JSON格式的对象 ie6,7不兼容
        /**
         *
         * @param str 要转换的json格式的字符串
         * @returns {Object}
         */
        jsonParse: function (str) {
            return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");//经验之谈，eval里加小括号
        },

//获取经过计算机渲染的对象的属性值，元素.style的方法只能获取行内样式，样式表中的样式获取不到
        /**
         *
         * @param curEle 要获取的哪个元素的属性
         * @param attr   要获取哪个属性
         * @returns {*}  属性值
         */
        getCss: function (curEle, attr) {
            var reg = /^-?\d+(\.\d+)?(px|em|pt|deg|rem|%)?$/;
            var val = null;

            if (/MSIE(?:6|7|8)/.test(window.navigator.userAgent)) {
                //处理滤镜问题
                if (attr === "opacity") {
                    val = curEle.currentStyle["filter"];
                    var reg1 = /alpha\(opacity=(\d+(\.\d+)?)\)/;//滤镜格式有很多，这里不必加^$
                    return reg1.test(val) ? RegExp.$1 / 100 : 1;
                }
                else {
                    val = curEle.currentStyle[attr];
                }
            }
            else {
                val =attr==="opacity"?window.getComputedStyle(curEle, null)[attr]/1:window.getComputedStyle(curEle, null)[attr];
            }
            return reg.test(val) ? parseFloat(val) : val;

        },

//js中给元素设置某个样式的属性值，只能通过style设置行内样式
        setCss:function(curEle,attr,val){
            //在js中设置float 也需要处理兼容
            if(attr==="float")
            {
                curEle.style["cssFloat"]=val;
                curEle.style["styleFloat"]=val;
                return;
            }
            //处理透明度兼容问题
            if(attr==="opacity")
            {
                curEle.style["opacity"]=val;
                curEle.style["filter"]="alpha(opacity="+val*100+")";
                return;
            }
            var reg=/^(border-radius|width|height|top|bottom|left|right|((margin|padding)(Top|Bottom|Left|Right)?))$/;
            if(reg.test(attr))
            {
                if(!isNaN(val))//是有效数字说明没加单位
                {
                    val+="px";
                }
            }
            curEle.style[attr]=val;


        },

//批量设置元素的样式属性值
        setCssGroup:function(curEle,options){

            options=options||"0";//避免不传参返回undefined 导致报错
            if(Object.prototype.toString.call(options)!=="[object Object]")
            {
                return;
            }
            for(var key in options)
            {
                if(options.hasOwnProperty(key))
                {
                    this.setCss(curEle,key,options[key]);
                }

            }


        },

//jquery中提供了一个方法，既能获取，又能设置(单独和批量)元素的样式属性值
        css:function(curEle){
            var arg1=arguments[1];
            if(typeof arg1==="string")
            //第二个参数是字符串就可能是获取属性值(不是字符串是对象的话就是批量设置)，因为还需要判断是否有第三个参数，有三参就是在单独设置
            {
                var arg2=arguments[2];
                if(typeof arg2==="undefined")//三参不存在
                {
                    return this.getCss(curEle,arg1);
                    //return this.getCss(this,arguments)
                }
                //三参存在就是单独设置
                this.setCss(curEle,arg1,arg2);
                //this.setCss.apply(this,arguments)

            }
            if(Object.prototype.toString.call(arg1)==="[object Object]")
            {
                this.setCssGroup(curEle,arg1);
            }


        },

//求任何一个元素相对于body的偏移量，不管它的offsetParent是谁
        /**
         *
         * @param ele 当前元素
         * @returns {{left: *, top: *}} 距离body左偏移，距离body的右偏移
         */
        offset: function (ele) {

            var left = ele.offsetLeft;
            var top = ele.offsetTop;
            var eleParent = ele.offsetParent;

            //debugger;


            while (eleParent) {//只要存在offsetParent
                //ie8中offsetLeft已经把边框加进去了 所以如果是ie8的话就不加clientLeft了
                if (/MSIE (?:8)/.test(window.navigator.userAgent))
                //也可用window.navigator.userAgent.indexOf("MSIE 8.0")判断是不是ie8，不等于-1就是ie8
                {
                    left += eleParent.offsetLeft;
                    top += eleParent.offsetTop;
                    eleParent = eleParent.offsetParent;
                }
                else {
                    left += eleParent.clientLeft + eleParent.offsetLeft;//加到了父级边框,又加到了父级的offsetLeft
                    top += eleParent.clientTop + eleParent.offsetTop;
                    eleParent = eleParent.offsetParent;
                }


            }
            return ({left: left, top: top});


        },

//通过document.documentElement||document.body 来获取属性值
        /**
         *
         * @param attr 需要获取哪个属性 比如scrollTop，clientHeight。。
         * @param val  赋值为多少
         * @returns {*} 返回属性值
         */
        getWin: function (attr, val) {//一个参数是读取，两个参数是赋值
            if (typeof val !== "undefined")
            //(Object.prototype.toString.call(val)!=="[object undefined]")
            {
                document.documentElement[attr] = val;
                document.body[attr] = val;
            }
            return document.documentElement[attr] || document.body[attr];
        },

//我们要通过childNodes获取所有子节点  自创Children获取子元素节点的方法,ie8下会把注释节点也当做元素标签
        /**
         *
         * @param ele 想获取谁的元素子节点
         * @param tagName  指定某类标签
         * @returns {Array}  当前元素的元素子节点们，指定了某类标签的话就返回当前元素的此类元素子节点
         */
        myChildren: function (ele, tagName) {

            var a = [];
            if (/MSIE (?:6|7|8)/.test(window.navigator.userAgent)) {
                var nodes = ele.childNodes;
                for (var i = 0; i < nodes.length; i++) {
                    if (nodes[i].nodeType == 1) {
                        a.push(nodes[i]);
                    }
                }
            }

            else {
                a = this.listToArray(ele.children);

            }
            //二次筛选
            if (tagName != undefined) {
                //判断tagName传没传 没传的话就获取下面所有的元素节点，传了的话就获取要获取的那个指定元素
                for (var k = 0; k < a.length; k++) {
                    if (a[k].nodeName != tagName.toUpperCase()) {
                        a.splice(k, 1);
                        k--;//防止数组塌陷
                    }
                }
            }
            return a;
        },


//通过previousSibling方法自创兼容的PreviousElementSibling
        /**
         *
         * @param curEle 当前元素 需要var curEle=document.getElementById("")
         * @returns {*}哥哥元素节点
         */
        preElementSibling:function(curEle){
            if(flag)
            {
                return curEle.previousElementSibling;
            }
            var p=curEle.previousSibling;
            while(p&& p.nodeType!=1)
            {
                p= p.previousSibling;
            }
            return p;


        },

//获取弟弟元素节点 参数同上
        mynextElementSibling:function(curEle){
            if(flag)
            {
                return curEle.nextElementSibling;
            }
            var n=curEle.nextSibling;
            while(n&& n.nodeType!=1)
            {
                n= n.nextSibling;
            }
            return n;
        },

//获取所有哥哥元素节点
        preElementSiblingAll:function(curEle){
            var ary=[];
            var p=this.preElementSibling(curEle);
            while(p)
            {
                ary.unshift(p);
                p=this.preElementSibling(p);
            }
            return ary;


        },
//获取所有弟弟元素节点
        mynextElementSiblingAll:function(curEle){
            var ary=[];
            var n=this.mynextElementSibling(curEle);
            while(n)
            {
                ary.push(n);
                n=this.mynextElementSibling(n);
            }
            return ary;

        },

//获取相邻的两个元素节点,即一个哥哥一个弟弟
        neigSibling:function(curEle){
            var p=this.preElementSibling(curEle);
            var n=this.mynextElementSibling(curEle);
            var ary=[];
            p?ary.push(p):null;
            n?ary.push(n):null;
            return ary;


        },

//获取所有兄弟元素节点，即所有哥哥和所有弟弟
        neigSiblingAll:function(curEle){
            return this.preElementSiblingAll(curEle).concat(this.mynextElementSiblingAll(curEle));

        },

//获取当前元素索引 有几个哥哥索引就是几
        index:function(curEle){
            return this.preElementSiblingAll(curEle).length;
        },

//第一个元素子节点
        firstEleChild:function(curEle){
            if(flag)
            {
                return curEle.firstElementChild;
            }
            var chs=this.myChildren(curEle);
            return chs.length>0?chs[0]:null;

        },

//最后一个元素子节点
        lastEleChild:function(curEle){
            if(flag)
            {
                return curEle.lastElementChild;
            }
            var chs=this.myChildren(curEle);
            return chs.length>0?chs[chs.length-1]:null;
        },

//向指定容器里面的末尾追加一项
        /**
         *
         * @param newEle 要操作的元素
         * @param container  要放到的盒子里
         */
        myAppend:function(newEle,container){

            return container.appendChild(newEle);

        },

//向指定容器里面的开头追加一项
        myBppend:function(newEle,container){

             var fir=this.firstEleChild(container);
             return container.insertBefore(newEle,fir);
            //没有儿子也照样能插入

         },

//追加到指定元素的前面
        insertBefore:function(a,b){
            b.parentNode.insertBefore(a,b);
        },

//追加到指定元素的后面
        insertAfter:function(a,b){
            var n=this.mynextElementSibling(b);

                b.parentNode.insertBefore(a,n);



        },

//验证当前元素是否包含className这个样式类名
        hasClass:function(curEle,name){
            var ary = name.replace(/^ +| +$/g, " ").split(/ +/g);
            var isok = true;
            for (var i = 0; i < ary.length; i++)
            {//这个循环全部结束才能判断是否包含了全部样式
                var reg = new RegExp("(^| +)" + ary[i] + "( +|$)");

                if (!reg.test(curEle.className))
                {
                    isok = false;
                    return false;
                }
            }
            if (isok) {
                return true;
            }
            /*var reg=new RegExp("(^| +)"+name+"( +|$)");
            return reg.test(curEle.className);*/


        },

//给元素增加样式类名
        addClass:function(curEle,className) {
            var ary=className.split(/\s+/g);
            for(var i=0;i<ary.length;i++)
            {
                if(!this.hasClass(curEle,ary[i]))//如果当前元素已经存在你要加入的类样式，就不再重复添加
                {
                    curEle.className+=" "+ary[i];//要加一个空格 否则连在一起了
                }
            }

        },

//给当前元素移除样式类名
        removeClass:function(curEle,className){
            var ary=className.split(/\s+/g);
            for(var i=0;i<ary.length;i++)
            {
                if(this.hasClass(curEle,ary[i]))
                {
                    var reg=new RegExp("(^| +)"+ary[i]+"( +|$)");
                    curEle.className=curEle.className.replace(reg," ");
                }
            }
        },

//通过元素的className获取一组元素，兼容所有浏览器
        /**
         *
         * @param classname 要获取的样式类名，可能是一个或多个
         * @param context 获取元素的上下文，不传的话默认为document
         */
        mygetElementsByClassName: function (classname, context) {
            context = context || document;
            if(flag)//是标准浏览器
            {
                return this.listToArray(context.getElementsByClassName(classname));
            }

            var arr = [];

            var nodeList = context.getElementsByTagName("*");//获取指定上下文中的所有元素标签，不管什么样式
            var nameList = classname.replace(/^ +| +$/g, "").split(/ +/g); //我们传进来的样式，先去首尾空格，再拆分
            for (var i = 0; i < nodeList.length; i++)
            {
                var curNode = nodeList[i];
                var isOk = true;//假设nodeList[i]包含了所有的样式
                for (var k = 0; k < nameList.length; k++)
                //这个循环结束才能判断是不是包含了所有的样式，所以在这个循环的外面push，如果在里面push的话就只判断了一个而不是全部，比如我们想判断这个元素是否同时包含(a和b)这两个样式，如果在这个循环里面push，表示只要元素有a或者b其中的一个样式，那就会被push(还要注意break之后跳出循环体 )
                {
                    var reg = new RegExp("(^| +)" + nameList[k] + "( +|$)");
                    if (!reg.test(curNode.className))
                    {//判断当前标签是否包含当前样式类名
                        isOk = false;
                        break;//跳出nameList的循环体，从nodeList开始下次循环，continue的话就是跳出当前循环，继续下次nameList的循环
                    }
                }
                if (isOk)//拿每一个标签分别和所有样式类名比较后还是true  说明包含了所有样式
                {
                    arr.push(curNode);//拿到这个标签
                }

            }
            return arr;


        }














    }

})();
