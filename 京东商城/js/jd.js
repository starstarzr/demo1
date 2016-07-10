/**
 * Created by Alice on 2016/5/12.
 */
//城市
    !function(){
var city_ul = document.getElementById("city_ul");
var city = document.getElementById("city");
var span = city.getElementsByTagName("span")[0];

city_ul.onclick = function (e) {
    e = e || window.event;
    e.target = e.target || e.srcElement;

   /* if (e.target.tagName.toLowerCase() == "li") {
        utils.css(utils.myChildren(e.target, "a")[0], {background: "#C81623", color: "white"});
        var siblings1=utils.neigSiblingAll(e.target);
        for (var j = 0; j < siblings1.length; j++) {
            var b = utils.firstEleChild(siblings1[j]);
            utils.removeClass(b, "select");
        }
    }*/
    if (e.target.parentNode.tagName.toLowerCase() == "li") {
        utils.addClass(e.target, "select");
        var siblings = utils.neigSiblingAll(e.target.parentNode, "li");
        for (var i = 0; i < siblings.length; i++) {
            var a = utils.firstEleChild(siblings[i]);
            utils.removeClass(a, "select");
        }
        span.innerHTML = e.target.innerHTML;
        utils.css(city_ul, "display", "none");

    }

};
city.onmouseover = function (e) {
    e = e || window.event;
    utils.css(city_ul, "display", "block");

};
city.onmouseout = function (e) {
    e = e || window.event;
    utils.css(city_ul, "display", "none");

};
    }();

//购物车
!function(){
var shopcar = document.getElementById("shopcar");
var goods = document.getElementById("goods");
var ulspacer6 = document.getElementById("ulspacer6");
shopcar.onmouseenter = function () {
    utils.css(shopcar, "background", "white");

    utils.css(goods, "display", "block");
    utils.css(ulspacer6, "display", "block");
};

shopcar.onmouseleave = function () {
    utils.css(shopcar, "background", "#f9f9f9");

    utils.css(goods, "display", "none");
    utils.css(ulspacer6, "display", "none");
};
}();

//1033 搜索框
//http://dd-search.jd.com/?ver=2&zip=1&key=ff&pvid=5octvxoi.s7iefp&t=1464846567974&curr_url=www.jd.com%2F&callback=jQuery8516724
!function(){
var search_list = document.getElementById("search_list");
var text = document.getElementById("text");

text.onkeydown =function () {
    var val = this.value.replace(/(^ +| +$)/g, "");
    //console.log(val.length);
    if (val.length > 0) {
        showList();
        //search_list.style.display = "block";

    }
    else {
        search_list.style.display = "none";
    }
};
    text.onfocus =function () {
        var val = this.value.replace(/(^ +| +$)/g, "");
        //console.log(val.length);
        if (val.length > 0) {
            showList();

            //search_list.style.display = "block";

        }
        else {
            search_list.style.display = "none";
        }
    };
document.body.onclick = function (e) {
    e = e || window.event;
    e.target = e.target || e.srcElement;
    if (e.target.parentNode.parentNode.id == "search_list") {
        if(e.target.className=="search_item")
        {
            search_list.style.display = "none";
            text.value = e.target.innerHTML;
        }
        if(e.target.className=="search_count")
        {
            search_list.style.display = "none";
            text.value = utils.preElementSibling(e.target).innerHTML;
        }

        return;
    }
    

    if (e.target.id == "text") {
        return;
    }
    search_list.style.display = "none";

};

    //模糊搜索
    function showList() {
        var val = text.value.replace(/(^ +| +$)/g, "");
        if(val=="")
        {
            return;
        }
        jsonp("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
            {wd:val},'cb',function (data) {
                //console.log(data)
                var list=data.s;
                var str='';
                var str1="约1000件";
                for(var i=0;i<list.length;i++)
                {
                    str+='<li>';
                    str+='<span class="search_item">'+list[i]+'</span>';
                    str+='<span class="search_count">'+str1+'</span>';
                    str+='</li>';
                }
                if(!str)
                {
                    search_list.style.display = "none";
                    return;
                }
                search_list.innerHTML=str;
                search_list.style.display = "block";
            });
    }
}();
//361 左侧导航
!function(){
var classification=document.getElementById("classification");
var classification_lis=classification.getElementsByTagName("li");
for(var i=0;i<classification_lis.length;i++)
{
    !function(i){
        var classification_div=utils.lastEleChild(classification_lis[i]);
        classification_lis[i].onmouseover=function(){
            classification_div.style.display="block";
            classification_div.style.top=-i*31+"px";
        };
        classification_lis[i].onmouseout=function(){
            classification_div.style.display="none";
        }
    }(i)
}
}();

//轮播图
!function(){
    var shuffling_figure=document.getElementById("shuffling-figure");
    var inner=document.getElementById("inner");
    var divList=inner.getElementsByTagName("div");
    var imgList=inner.getElementsByTagName("img");
    var tips=document.getElementById("tips");
    var tipsList=tips.getElementsByTagName("li");

    //延时加载
    function delayImg(){
        for(var i=0;i<imgList.length;i++)
        {
            !function(i){
            if(imgList[i].isLoad==true)return;
            var tempImg=new Image;
            tempImg.src=imgList[i].getAttribute("trueSrc");
            tempImg.onload=function(){
                imgList[i].src=this.src;
                imgList[i].style.display="block";
                tips.style.display="block";
                if(i==0)
                {
                    var div=imgList[i].parentNode.parentNode;
                    div.style.zIndex=1;
                    zhufengAnimate(div,{opacity:1},300);
                }
                tempImg=null;
                imgList[i].siLoad=true;

            }
            }(i)
        }
    }
    setTimeout(delayImg,1000);

    //自动轮播
    var step=0;
    function autoMove(){
        if(step==imgList.length-1)
        {
            step=-1;
        }
        step++;
        setBanner();
        focusAligned();
    }
    var autoTimer=setInterval(autoMove,3000);
    function setBanner(){
        for(var i=0;i<divList.length;i++){
            if(i==step){
                divList[i].style.zIndex=1;
                zhufengAnimate(divList[i],{opacity:1},300,function(){

                    var siblings=utils.neigSiblingAll(this);//注意this
                        for(var j=0;j<siblings.length;j++)
                    {
                        utils.css(siblings[j],"opacity",0);
                    }
                });
                continue;//不加这行有错误
            }
            divList[i].style.zIndex=0;
        }
    }

    //焦点对齐
    function focusAligned(){
        for(var i=0;i<tipsList.length;i++)
        {
            if(i==step)
            {
                utils.addClass(tipsList[i],"select");
            }
            else
            {
                tipsList[i].className="";
            }
        }
    }

    //焦点轮播
    function focusChange(){
        for(var i=0;i<tipsList.length;i++)
        {
            tipsList[i].index=i;
            tipsList[i].onmouseover=function(){
                step=this.index;
                setBanner();
                focusAligned();
            }
        }
    }
    focusChange();

    shuffling_figure.onmouseover=function(){
        clearInterval(autoTimer);
        leftBtn.style.display=rightBtn.style.display="block";
    };
    shuffling_figure.onmouseout=function(){
        autoTimer=setInterval(autoMove,2000);
        leftBtn.style.display=rightBtn.style.display="none";
    };

    
    rightBtn.onclick=function(){
        autoMove();
    };

    
    leftBtn.onclick=function(){
        if(step==0)
        {
            step=imgList.length;
        }
        step--;
        setBanner();
        focusAligned();
    }


}();


/*!function(){
    var ul=document.getElementById("service");

    var lis=utils.mygetElementByClassName("li");
    //console.log(lis);
    for(var i=0;i<lis.length;i++)
    {
        !function(i){

        var div=utils.lastEleChild(lis[i]);
        //console.log(div);
        lis[i].onmouseover=function(){

            zhufengAnimate(div,{top:29},200);

            div.style.display="block";
        };
        lis[i].onmouseout=function(){
            div.style.display="none";
        }
        }(i);



    }


}();*/

//今日推荐
!function(){
    var top5_banner=document.getElementById("top5_banner");
    var top5_banner_inner=document.getElementById("top5_banner_inner");
    var liList=top5_banner_inner.getElementsByTagName("li");
    var leftBtn1=document.getElementById("leftBtn1");
    var rightBtn1=document.getElementById("rightBtn1");
    //console.log(top5_banner_inner);

    //console.log(liList);
    var step=0;
    function move(){
        if(step==liList.length-1)
        {
            step=0;
            utils.css(top5_banner_inner,"left",0);
        }
        step++;
        zhufengAnimate(top5_banner_inner,{left:-step*1000},500);

    }
    leftBtn1.onclick=function(){
        if(step==0)
        {
            step=liList.length-1;
            utils.css(top5_banner_inner,"left",-step*1000);

        }
        step--;
        zhufengAnimate(top5_banner_inner,{left:-step*1000},500);

    };
    rightBtn1.onclick=move;

    top5_banner.onmouseover=function(){
        leftBtn1.style.display=rightBtn1.style.display="block";
    };
    top5_banner.onmouseout=function(){
        leftBtn1.style.display=rightBtn1.style.display="none";
    }



}();

//猜你喜欢
!function(){
    var guessLike=document.getElementById("guessLike");
    var guessLike_t_change=document.getElementById("guessLike_t_change");
    var ulContainer=document.getElementById("ulContainer");
    var ulList=ulContainer.getElementsByTagName("ul");
    var oI=document.getElementById("i");
    var step=0;
    function move(){
        if(step==ulList.length-1)
        {
            step=-1;
            utils.css(ulContainer,"left",0);
        }
        step++;
        console.log(step);
        utils.css(ulContainer,"left",-step*1208);

    }
    guessLike_t_change.onclick=move;
    guessLike.onmouseenter=function(){
        utils.css(oI,'left',"-365px");
        zhufengAnimate(oI,{left:843},500);
    };
    guessLike.onmouseout=function(){
        //utils.css(oI,'left',"843px");
        //guessLike.onmouseover=null;
    }




}();


//封装选项卡
!function () {
    var tab=document.getElementById("tab");
    tabChange(tab);
    var tab2=document.getElementById("tab2");
    tabChange(tab2);
    var tab3=document.getElementById("tab3");
    tabChange(tab3);
    var tab4=document.getElementById("tab4");
    tabChange(tab4);
    var tab5=document.getElementById("tab5");
    tabChange(tab5);
    var tab6=document.getElementById("tab6");
    tabChange(tab6);
    var tab7=document.getElementById("tab7");
    tabChange(tab7);
    var tab8=document.getElementById("tab8");
    tabChange(tab8);
    var tab9=document.getElementById("tab9");
    tabChange(tab9);
    var tab10=document.getElementById("tab10");
    tabChange(tab10);
    var tab11=document.getElementById("tab11");
    tabChange(tab11);

    function tabChange(tab){
        var liList=tab.getElementsByTagName("li");
        for(var i=0;i<liList.length;i++)
        {
            liList[i].index=i;
            var curLi=liList[i];
            curLi.onmouseover=function (e) {
               /* var lis=utils.mygetElementByClassName("tab_item");
                for(var a=0;a<lis.length;a++)
                {
                    if(a==this.index)
                    {
                        var span=utils.myChildren(lis[a],"span")[0];
                        if(e.target.parentNode.tagName.toLowerCase()=="li"||e.target.parentNode.tagName.toLowerCase()=="div"){
                            span.style.display="none";
                        }
                    }
                }*/
                if(e.target.parentNode.tagName.toUpperCase()=="LI")
                {
                    utils.addClass(e.target.parentNode,"tab_selectd");
                    var siblings=utils.neigSiblingAll(e.target.parentNode);
                    var abc=utils.myChildren(e.target.parentNode,"span")[0];
                    abc.style.display="none";
                    for(var j=0;j<siblings.length;j++)
                    {
                        utils.removeClass(siblings[j],"tab_selectd");
                        utils.myChildren(siblings[j],"span")[0].style.display="block";
                    }
                    var divList=utils.mynextElementSiblingAll(e.target.parentNode.parentNode);
                    for(var k=0;k<divList.length;k++)
                    {
                        if(k===this.index)
                        {
                            utils.addClass(divList[k],"tab_selectd");
                        }
                        else{
                            utils.removeClass(divList[k],"tab_selectd");
                        }
                    }

                }
            }

        }
    }

    



}();


//封装轮播图
!function () {

    //var banner=document.getElementById("banner");
    //bannerChange(banner);
    var bannerCon=document.getElementById("bannerCon");
    var bannerCon2=document.getElementById("bannerCon2");
    var bannerCon3=document.getElementById("bannerCon3");
    var bannerCon4=document.getElementById("bannerCon4");
    var bannerCon5=document.getElementById("bannerCon5");
    var bannerCon6=document.getElementById("bannerCon6");
    var bannerCon7=document.getElementById("bannerCon7");
    var bannerCon8=document.getElementById("bannerCon8");
    var bannerCon9=document.getElementById("bannerCon9");
    var bannerCon10=document.getElementById("bannerCon10");
    var bannerCon11=document.getElementById("bannerCon11");
    var bannerCon12=document.getElementById("bannerCon12");


    bannerChange(bannerCon,439);
    bannerChange(bannerCon2,339);
    bannerChange(bannerCon3,439);
    bannerChange(bannerCon4,439);
    bannerChange(bannerCon5,439);
    bannerChange(bannerCon6,339);
    bannerChange(bannerCon7,339);
    bannerChange(bannerCon8,339);
    bannerChange(bannerCon9,339);
    bannerChange(bannerCon11,439);
    bannerChange(bannerCon12,395);


    function bannerChange(ele,stepLength) {
        /*var banner=document.getElementById("banner");
        console.log(banner);
        var inner=document.getElementById("banner_inner");
        var tips=document.getElementById("banner_tips");
        console.log(inner);
        var imgList=inner.getElementsByTagName("img");
        var oLis=tips.getElementsByTagName("li");//小圆点
        var leftBtn=document.getElementById("F1_leftBtn");
        var rightBtn=document.getElementById("F1_rightBtn");*/
        var banner=utils.myChildren(ele,"div")[0];
        //console.log(banner);
        var inner=utils.myChildren(banner,"ul")[0];
        //console.log(inner);
        var tips=utils.myChildren(banner,"ul")[1];
        var imgList=inner.getElementsByTagName("li");//不用img的原因是2楼每一个li里有两张img
        var oLis=tips.getElementsByTagName("li");
        var leftBtn=utils.myChildren(banner,"a")[0];
        var rightBtn=utils.myChildren(banner,"a")[1];

        var step=0;//当前是哪一张图片  0是第一张图片(就相当于索引)

        function autoMove(){

            if(step==imgList.length-1)//5张图片 索引为0 1 2 3 4  当step=4时为重复的那一张 让他的step=0
            {
                step=0;
                utils.setCss(inner,"left",-step*stepLength/*0*/);
            }
            step++;
            zhufengAnimate(inner,{left:-step*stepLength},300);
            focusAligned();//焦点对齐
        }
        var autoTimer=setInterval(autoMove,4000);

        function focusAligned(){
            for(var i=0;i<oLis.length;i++)
            {
                //临时的来处理图片多一张而li不存在
                var stepTemp=step>oLis.length-1?0:step;

                stepTemp==i?oLis[i].className="select":oLis[i].className="";
            }
        }
        function tipsChange(){
            for(var i=0;i<oLis.length;i++)
            {
                oLis[i].selfIndex=i;
                oLis[i].onmouseover=function(){
                    step=this.selfIndex;
                    zhufengAnimate(inner,{left:-step*stepLength},300);
                    focusAligned();
                }
            }
        }
        tipsChange();


        //鼠标滑过停止轮播
        banner.onmouseover=function(){
            clearInterval(autoTimer);
            //滑上去的时候左右按钮出现
            leftBtn.style.display=rightBtn.style.display="block";

        };
        banner.onmouseout=function(){
            autoTimer=setInterval(autoMove,4000);
            //滑出左右按钮隐藏
            leftBtn.style.display=rightBtn.style.display="none";

        };
        leftBtn.onclick=function(){

            if(step==0)
            {
                step=imgList.length-1;
                utils.setCss(inner,"left",-step*stepLength);
            }
            step--;
            zhufengAnimate(inner,{left:-step*stepLength},500);
            focusAligned();
        };
        rightBtn.onclick=autoMove;//不加小括号
    }

    
    
    
    
    
}();


!function () {
    var bannerCon121=document.getElementById("bannerCon121");
    bannerChange(bannerCon121,395);
    function bannerChange(ele,stepLength) {
        /*var banner=document.getElementById("banner");
         console.log(banner);
         var inner=document.getElementById("banner_inner");
         var tips=document.getElementById("banner_tips");
         console.log(inner);
         var imgList=inner.getElementsByTagName("img");
         var oLis=tips.getElementsByTagName("li");//小圆点
         var leftBtn=document.getElementById("F1_leftBtn");
         var rightBtn=document.getElementById("F1_rightBtn");*/
        var banner=utils.myChildren(ele,"div")[0];
        //console.log(banner);
        var inner=utils.myChildren(banner,"ul")[0];
        //console.log(inner);
        var tips=utils.myChildren(banner,"ul")[1];
        var imgList=inner.getElementsByTagName("li");//不用img的原因是2楼每一个li里有两张img
        var oLis=tips.getElementsByTagName("li");
        var leftBtn=utils.myChildren(banner,"a")[0];
        var rightBtn=utils.myChildren(banner,"a")[1];

        var step=0;//当前是哪一张图片  0是第一张图片(就相当于索引)

        function autoMove(){

            if(step==imgList.length-1)//5张图片 索引为0 1 2 3 4  当step=4时为重复的那一张 让他的step=0
            {
                step=0;
                utils.setCss(inner,"left",-step*stepLength/*0*/);
            }
            step++;
            zhufengAnimate(inner,{left:-step*stepLength},300);
            focusAligned();//焦点对齐
        }
        var autoTimer=setInterval(autoMove,7000);

        function focusAligned(){
            for(var i=0;i<oLis.length;i++)
            {
                //临时的来处理图片多一张而li不存在
                var stepTemp=step>oLis.length-1?0:step;

                stepTemp==i?oLis[i].className="select":oLis[i].className="";
            }
        }
        function tipsChange(){
            for(var i=0;i<oLis.length;i++)
            {
                oLis[i].selfIndex=i;
                oLis[i].onmouseover=function(){
                    step=this.selfIndex;
                    zhufengAnimate(inner,{left:-step*stepLength},300);
                    focusAligned();
                }
            }
        }
        tipsChange();


        //鼠标滑过停止轮播
        banner.onmouseover=function(){
            clearInterval(autoTimer);
            //滑上去的时候左右按钮出现
            leftBtn.style.display=rightBtn.style.display="block";

        };
        banner.onmouseout=function(){
            autoTimer=setInterval(autoMove,4000);
            //滑出左右按钮隐藏
            leftBtn.style.display=rightBtn.style.display="none";

        };
        leftBtn.onclick=function(){

            if(step==0)
            {
                step=imgList.length-1;
                utils.setCss(inner,"left",-step*stepLength);
            }
            step--;
            zhufengAnimate(inner,{left:-step*stepLength},500);
            focusAligned();
        };
        rightBtn.onclick=autoMove;//不加小括号
    }
}();


//热门晒单
!function () {
    var everyBanner=document.getElementById("everyBanner");
    var everyInner=document.getElementById("everyInner");
    var lilist=everyInner.getElementsByTagName("li");
    var step=0;
    function autoMove() {

        if(step==lilist.length-2)
        {
            step=0;
            utils.css(everyInner,"bottom",0);
        }
        step++;
        zhufengAnimate(everyInner,{bottom:-step*120},1000);
    }
    var timer=setInterval(autoMove,2000);
    everyBanner.onmouseover=function () {
        clearInterval(timer);
    };
    everyBanner.onmouseout=function () {
        timer=setInterval(autoMove,2000);
    }
    
    
}();



//楼层导航




    var flag=false,flagClick=0;
    var divs=utils.mygetElementsByClassName("f");
    var floorGuide=document.getElementById("floorGuide");
    var lis=floorGuide.getElementsByTagName("li");
    for(var i=0;i<lis.length;i++)
    {

        lis[i].index=i;
        if(flagClick==0){
            lis[i].onclick=function () {
                flagClick++;

                flag=true;
                //点击楼层跳转到相应楼层
                goPostion(divs[this.index]);
                for(var i=0;i<lis.length;i++){
                    utils.removeClass(lis[i],'click');
                }
                utils.addClass(this,'click');
                clearFloorChange();

            };
        }


        lis[i].onmouseover=function () {

            utils.addClass(lis[this.index],"hover");//给当前li添加hover样式类

            utils.removeClass(utils.neigSiblingAll(lis[this.index]),"hover");//给他的兄弟元素移除hover样式类

        };

        lis[i].onmouseleave=function () {
            utils.removeClass(lis[this.index],"hover");
        }

    }


    function clearFloorChange() {
        floorChange1=null;

    }
    

    function goPostion(ele) {
        var timer="";
        clearInterval(timer);
        var curTop=document.documentElement.scrollTop||document.body.scrollTop;
        var eleTop=ele.offsetTop;
        var duration=500,interval=10;
        var target=curTop-eleTop;
        var step=Math.abs(target/duration*interval);
       // floorChange1=null;
        timer=setInterval(function () {
            if(curTop>eleTop)
            {
                if(curTop-step<=eleTop)
                {
                    curTop=eleTop;
                    floorChange1=floorChange;
                    if(curTop==eleTop){
                        flag=false;
                        flagClick=0;
                    }

                }
                curTop-=step;
                document.documentElement.scrollTop=curTop;
                document.body.scrollTop=curTop;
            }
            else if(curTop<eleTop)
            {
                if(curTop+step>eleTop)
                {
                    curTop=eleTop;
                    floorChange1=floorChange;
                    if(curTop==eleTop){
                        flag=false;
                        flagClick=0;
                    }
                }
                curTop+=step;
                document.documentElement.scrollTop=curTop;
                document.body.scrollTop=curTop;

            }
        },interval);

    }



        function floor() {//判断楼层导航条显示还是隐藏
        var floorCon=document.getElementById("floorCon");
        var curTop=document.documentElement.scrollTop||document.body.scrollTop;
        var clientH=document.documentElement.clientHeight||document.body.clientHeight;
        var F1=document.getElementById("F1");
        var F12=document.getElementById("F12");
        var F1dis=F1.offsetTop;//一楼的高
        var F12dis=F12.offsetTop;//12楼的高

        if(((curTop+clientH)>=F1dis)&&(curTop+clientH<=(F12dis+F12.offsetWidth/2))){
            floorCon.style.display="block";
        }
        else {
            floorCon.style.display="none";
        }
    }
    floor();//上来先执行一次
    window.floor=floor;
    


      function floorChange(ele) {//当前是几楼 就让几楼的字体显示
          var curTop = document.documentElement.scrollTop || document.body.scrollTop;
          var clientH = document.documentElement.clientHeight || document.body.clientHeight;
          var eleDis = ele.offsetTop;
          for(var i=0;i<divs.length;i++){
              if(divs[i]==ele){
                  var index=i;
              }
          }
          if (curTop >= eleDis-clientH+300) {
              for(var i=0;i<lis.length;i++){
                  lis[i].className="";
              }
              utils.addClass(lis[index],"click");
          }
      }

    window.floorChange1=floorChange;















//延时加载
var guessLike=document.getElementById("guessLike");
//var lazyOnload=utils.mygetElementByClassName("lazyOnload",guessLike)[0];
var qualityLife=document.getElementById("qualityLife");
var everyDay=document.getElementById("everyDay");
var f12=document.getElementById("F12");
var f1=document.getElementById('F1');
var f2=document.getElementById('F2');
var f3=document.getElementById('F3');
var f5=document.getElementById('F5');
var f6=document.getElementById('F6');
var f7=document.getElementById('F7');
var f8=document.getElementById('F8');
var f9=document.getElementById('F9');
var f10=document.getElementById('F10');
var f11=document.getElementById('F11');
var f4=document.getElementById('F4');

function lazyLoad(ele){
    var lazyOnload=utils.myChildren(ele,"div")[0];
    var curScrollTop=utils.getWin("scrollTop")+utils.getWin("clientHeight");
    var eleTop=utils.offset(ele).top+ele.offsetHeight;
    if(ele.isLoad){
        return;
    }
    if(curScrollTop>=eleTop)
    {
        lazyOnload.style.display="block";
        //zhufengAnimate(lazyOnload,{opacity:1},1000);
        utils.removeClass(ele,"lazy-fn");
        ele.isLoad=true;
    }
}
window.onscroll=function(){
    //setTimeout(function(){lazyLoad(guessLike)},1000);
    //setTimeout(function(){lazyLoad(qualityLife)},1000);
        if(!flag){
            for(var i=0;i<divs.length;i++){
                floorChange1(divs[i]);
            }
        }


    floor();

    lazyLoad(guessLike);
    lazyLoad(qualityLife);
    lazyLoad(everyDay);
    lazyLoad(f12);
    lazyLoad(f1);
    lazyLoad(f2);
    lazyLoad(f3);
    lazyLoad(f4);
    lazyLoad(f5);
    lazyLoad(f6);
    lazyLoad(f7);
    lazyLoad(f8);
    lazyLoad(f9);
    lazyLoad(f10);
    lazyLoad(f11);
};



//回到顶部
!function () {
    var goTop=document.getElementById("goTop");
    goTop.onclick=function () {
        document.documentElement.scrollTop=0;
        document.body.scrollTop=0;
    }

}();

