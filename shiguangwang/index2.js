
~function () {
    //��Ӱ����
    ~function () {
        var moveUlList=document.getElementById('moveUlList');
        console.log(moveUlList)
        moveUlList.onclick= function (e) {
            e=e||window.event;
            e.stopPropagation? e.stopPropagation(): e.cancelBubble=true;
        }
        document.body.onclick= function (e) {
            e=e||window.event;
            var tar= e.target|| e.srcElement;
            var tarTagName=tar.tagName.toUpperCase();
            if((tarTagName=='SPAN'&&tar.className=='leftlogo_span')||(tarTagName=='I'&&tar.className=='leftlogo_I')){
                var isbok=moveUlList.style.display;
                moveUlList.style.display=isbok=='block'?'none':'block';
                return;
            }
            moveUlList.style.display='none';
        }
    }()
    //��λ����
    ~function () {
        var whereDW=document.getElementById('where_dingwei');
        var osousuocity=whereDW.getElementsByClassName('sousuocity')[0];
        var oLis=osousuocity.getElementsByTagName('li');
        var ocity=whereDW.getElementsByClassName('city')[0];
        var oDiv=ocity.getElementsByTagName('div');
        function tab(n){
            for(var i=0;i<oLis.length-1;i++){
                oLis[i].className='';
                oDiv[i].className='';
            }
            oLis[n].className='on';
            oDiv[n].className='on';
        }
        for(var i=0;i<oLis.length-1;i++){
            var curLi=oLis[i];
            curLi.index=i;
            curLi.onclick= function () {
                tab(this.index);
            }
        }
    }()
    ~function () {
        var changeCt=document.getElementById('change_city');
        var osousuocity=changeCt.getElementsByClassName('sousuocity')[0];
        var oLis=osousuocity.getElementsByTagName('li');
        var ocity=changeCt.getElementsByClassName('city')[0];
        var oDiv=ocity.getElementsByTagName('div');
        function tab(n){
            for(var i=0;i<oLis.length-1;i++){
                oLis[i].className='';
                oDiv[i].className='';
            }
            oLis[n].className='on';
            oDiv[n].className='on';
        }
        for(var i=0;i<oLis.length-1;i++){
            var curLi=oLis[i];
            curLi.index=i;
            curLi.onclick= function () {
                tab(this.index);
            }
        }

    }()
    //��������
    ~function () {
        var oinput2=document.getElementById('input2');
        var leftLogo=document.getElementById('leftlogo');
        var  oinput=leftLogo.getElementsByTagName('input')[0];
        var oinput3=document.getElementById('input3');
        var oinput4=document.getElementById('input4');
        var oinput5=document.getElementById('input5');
        var oinput6=document.getElementById('input6');
        var oinput7=document.getElementById('input7');

        oinput7.onfocus=oinput6.onfocus=oinput5.onfocus=oinput4.onfocus=oinput3.onfocus=oinput.onfocus=oinput2.onfocus= function () {
            if(this.value==this.defaultValue){
                this.value='';
            }
        }
        oinput7.onblur=oinput6.onblur=oinput5.onblur=oinput4.onblur=oinput3.onblur=oinput.onblur=oinput2.onblur= function () {
            var reg=/^\s*$/;
            if(reg.test(this.value)){
                this.value=this.defaultValue;
            }
        }




    }()

    //���ﳵ
    ~function () {
        var shopping=document.getElementById('shoppimg');
        var oshop=document.getElementById('shoppimgdetail')
        shopping.onmouseenter= function (e) {
            oshop.style.display='block';
        }
        shopping.onmouseleave= function (e) {
            oshop.style.display = 'none';
        }
    }()
    ~function () {
        var collection=document.getElementById('banner').getElementsByClassName('collection')[0]
        var inner=document.getElementById('banner').getElementsByClassName('inner')[0];


        inner.onmouseover= function () {
            collection.style.display='block';
        }
        inner.onmouseout= function () {
            collection.style.display='none';
        }


    }()
    //���¼������ֹð��
    ~function () {
        var login=document.getElementById('login');
        var lm=login.getElementsByClassName('love_movies')[0];
        var moveUlList=document.getElementById('moveUlList');
        var whereDW=document.getElementById('where_dingwei');
        var changeCt=document.getElementById('change_city');
        var changeCDW=document.getElementById('change_city_dingwei');
        var select_movies=document.getElementById('select_movies');
        var movies_tip=document.getElementById('movies_tip');
        var searcherplae=document.getElementById('searcherplaefix');
        var select_time=document.getElementById('select_time2');
        /* var smEm=select_movies.getElementsByClassName('smEm')[0]
         smEm.onclick= function (e) {
         e=e|| e.event;
         e.stopPropagation? e.stopPropagation(): e.cancelBubble=true;
         }*/
        select_time.onclick= function (e) {
            e=e|| e.event;
            e.stopPropagation? e.stopPropagation(): e.cancelBubble=true;
        }

        searcherplae.onclick= function (e) {
            e=e|| e.event;
            e.stopPropagation? e.stopPropagation(): e.cancelBubble=true;
        }

        movies_tip.onclick= function (e) {
            e=e|| e.event;
            e.stopPropagation? e.stopPropagation(): e.cancelBubble=true;
        }

        lm.onclick= function (e) {
            e=e|| e.event;
            e.stopPropagation? e.stopPropagation(): e.cancelBubble=true;
        }
        changeCDW.onclick= function (e) {
            e=e|| e.event;
            e.stopPropagation? e.stopPropagation(): e.cancelBubble=true;
        }
        whereDW.onclick= function (e) {
            e=e|| e.event;
            e.stopPropagation? e.stopPropagation(): e.cancelBubble=true;
        }
        document.body.onclick= function (e) {
            e=e|| e.event;
            var tar= e.target;
            if((tar.tagName.toUpperCase()=='I'&&tar.className=='loginI')||(tar.className=='loginSpan'&&tar.tagName.toUpperCase()=='SPAN')){
                var isbok=lm.style.display;
                if(isbok=='none'){
                    lm.style.display='block';
                }else{lm.style.display='none';}
                return;
            }
            var tarTagName=tar.tagName.toUpperCase();
            if((tarTagName=='SPAN'&&tar.className=='leftlogo_span')||(tarTagName=='I'&&tar.className=='leftlogo_I')){
                var isbok=moveUlList.style.display;
                moveUlList.style.display=isbok=='block'?'none':'block';
                return;
            }
            if((tarTagName=='STRONG'&&tar.className=='where_strong')||(tarTagName=='SPAN'&&tar.className=='where_span')||(tarTagName=='B'&&tar.className=='where_b')){
                var isbok=whereDW.style.display;
                whereDW.style.display=isbok=='block'?'none':'block';
                return;

            }
            if((tarTagName=='SPAN'&&tar.className=='change_city_span')||(tarTagName=='I'&&tar.className=='change_city_i')||(tarTagName=='EM'&&tar.className=='change_city_em')){
                var isbok=changeCDW.style.display;
                changeCDW.style.display=isbok=='block'?'none':'block';
                return;

            }
            if((tarTagName=='B'&&tar.className=='smB')||(tarTagName=='STRONG'&&tar.className=='smStrong')||(tarTagName=='SPAN'&&tar.className=='smSpan')||(tarTagName=='I'&&tar.className=='smI')){
                var isbok=movies_tip.style.display;
                movies_tip.style.display=isbok=='block'?'none':'block';
                return;

            }
            if((tarTagName=='B'&&tar.className=='spB')||(tarTagName=='STRONG'&&tar.className=='spStrong')||(tarTagName=='SPAN'&&tar.className=='spSpan')||(tarTagName=='I'&&tar.className=='spI')){
                var isbok=searcherplae.style.display;
                searcherplae.style.display=isbok=='block'?'none':'block';
                return;
                sp
            }
            if((tarTagName=='SPAN'&&tar.className=='stSpan')||(tarTagName=='I'&&tar.className=='stI')){
                var isbok=select_time.style.display;
                select_time.style.display=isbok=='block'?'none':'block';
                return;

            }

            moveUlList.style.display='none';
            lm.style.display='none';
            whereDW.style.display='none';
            changeCDW.style.display='none';
            movies_tip.style.display='none';
            searcherplae.style.display='none';
            select_time.style.display='none';
        }




    }()

    //���ѡ�еĹ��ܵ�һ���ص㶨λ
    ~function(){
        var where=document.getElementById('where');
        var wstrong=where.getElementsByClassName('where_strong')[0]
        var input2=document.getElementById('input2');
        var ocity=document.getElementById('city');
        var oLis=ocity.getElementsByTagName('li');
        var where_dingwei=document.getElementById('where_dingwei');
        for(var i=0;i<oLis.length;i++){
            var curLi=oLis[i];
            curLi.onclick= function () {
                var reg=/^[\u4e00-\u9fa5]{2,4}$/;
                if(reg.test(this.innerHTML)) {
                    wstrong.innerHTML = this.innerHTML;
                    where_dingwei.style.display='none';
                }
            }
        }

        input2.onkeydown= function (e) {
            if(e.keyCode==13){
                console.log(e.keyCode)
                var reg=/^[\u4e00-\u9fa5]{2,4}$/;
                if(reg.test(this.value)){
                    wstrong.innerHTML=this.value;
                    console.log(this.value)
                    where_dingwei.style.display='none';
                }
            }
        }


    }()
//���ѡ�еĹ��ܵ�er���ص㶨λ
    ~function(){
        var change_city=document.getElementById('change_city');
        var ccspan=change_city.getElementsByClassName('change_city_span')[0]
        var input5=document.getElementById('input5');
        var ocity=document.getElementById('city2');
        var oLis=ocity.getElementsByTagName('li');
        var change_city_dingwei=document.getElementById('change_city_dingwei');
        for(var i=0;i<oLis.length;i++){
            var curLi=oLis[i];
            curLi.onclick= function () {
                var reg=/^[\u4e00-\u9fa5]{2,4}$/;
                if(reg.test(this.innerHTML)) {
                    ccspan.innerHTML = this.innerHTML;
                    change_city_dingwei.style.display='none';
                }
            }
        }

        input5.onkeydown= function (e) {
            if(e.keyCode==13){
                console.log(e.keyCode)
                var reg=/^[\u4e00-\u9fa5]{2,4}$/;
                if(reg.test(this.value)){
                    ccspan.innerHTML=this.value;
                    console.log(this.value)
                    change_city_dingwei.style.display='none';
                }
            }
        }


    }()

//���ѡ�еĹ�����ӰƬ
    ~function(){
        var select_movies=document.getElementById('select_movies');
        var smB=select_movies.getElementsByClassName('smB')[0]
        var select_movies_p=select_movies.getElementsByClassName('select_movies_p')[0]
        var select_movies_p2=select_movies.getElementsByClassName('select_movies_p2')[0]
        var smEm=select_movies.getElementsByClassName('smEm')[0]
        var input7=document.getElementById('input7');
        var sub=document.getElementById('sub');
        var oLis=sub.getElementsByTagName('li');
        var movies_tip=document.getElementById('movies_tip');

        select_movies.smB=smB.innerHTML;
        select_movies.smEm=smEm.innerHTML;
        console.log(select_movies.smB)
        console.log(select_movies.smEm)
        for(var i=0;i<oLis.length;i++){
            var curLi=oLis[i];
            curLi.onclick= function () {
                smB.innerHTML = this.innerHTML;
                smEm.innerHTML=select_movies_p.innerHTML;
                smEm.style.marginLeft='20px'
                smEm.style.color='blue'
                utils.addClass(movies_tip.parentNode,'selected');
                movies_tip.style.display='none';
            }
        }

        input7.onkeydown= function (e) {
            if(e.keyCode==13){
                console.log(e.keyCode)
                var reg=/^[\u4e00-\u9fa5]{2,20}$/;
                if(reg.test(this.value)){
                    smB.innerHTML=this.value;
                    console.log(this.value)
                    smEm.innerHTML=select_movies_p.innerHTML;
                    smEm.style.marginLeft='20px';
                    smEm.style.color='blue';
                    utils.addClass(movies_tip.parentNode,'selected');
                    movies_tip.style.display='none';
                }
            }
        }
        if(smEm.value==smEm.defaultValue){
            smEm.onclick= function (e) {
                e=e|| e.event;
                e.stopPropagation? e.stopPropagation(): e.cancelBubble=true;
            }
            smEm.onclick= function () {
                smB.innerHTML=select_movies.smB;
                smEm.innerHTML=select_movies.smEm;
                smEm.style.marginLeft='0px';
                smEm.style.color='#333';
                utils.removeClass(movies_tip.parentNode,'selected');
                movies_tip.style.display='none';
            }
        }
    }()
//���ѡ�еĹ�����ӰԺ
    ~function(){
        var select_cinema=document.getElementById('select_cinema');
        var spB=select_cinema.getElementsByClassName('spB')[0]
        var select_cinema_p=select_cinema.getElementsByClassName('select_cinema_p')[0]
        var spEm=select_cinema.getElementsByClassName('spEm')[0]
        var input6=document.getElementById('input6');
        var arealist=document.getElementById('arealist');
        var oLis=arealist.getElementsByTagName('dd');
        var searcherplaefix=document.getElementById('searcherplaefix');

        select_cinema.spB=spB.innerHTML;
        select_cinema.spEm=spEm.innerHTML;
        for(var i=0;i<oLis.length;i++){
            var curLi=oLis[i];
            curLi.onclick= function () {
                spB.innerHTML = this.innerHTML;
                console.log(select_cinema.tagName);
                spEm.innerHTML=select_cinema_p.innerHTML;
                spEm.style.marginLeft='30px'
                spEm.style.color='blue'
                utils.addClass(searcherplaefix.parentNode,'selected');
                searcherplaefix.style.display='none'
            }
        }
        input6.onkeydown= function (e) {
            if(e.keyCode==13){
                console.log(e.keyCode)
                var reg=/^[\u4e00-\u9fa5]{2,20}$/;
                if(reg.test(this.value)){
                    spB.innerHTML=this.value;
                    console.log(this.value)
                    spEm.innerHTML=select_cinema_p.innerHTML;
                    spEm.style.marginLeft='30px';
                    spEm.style.color='blue';
                    utils.addClass(searcherplaefix.parentNode,'selected');
                    searcherplaefix.style.display='none'
                }
            }
        }
        if(spEm.value==spEm.defaultValue) {
            spEm.onclick = function (e) {
                e = e || e.event;
                e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
            }
            spEm.onclick = function () {
                spB.innerHTML = select_cinema.spB;
                spEm.innerHTML = select_cinema.spEm;
                spEm.style.marginLeft = '0px';
                spEm.style.color = '#333';
                utils.removeClass(searcherplaefix.parentNode, 'selected');
                searcherplaefix.style.display = 'none'
            }
        }
    }()

//���ѡ�еĹ�����ӰԺ
    ~function(){
        var searcherplaefix=document.getElementById('searcherplaefix');
        var movies_tip=document.getElementById('movies_tip');
        var select_time=document.getElementById('select_time');
        var select_time2=document.getElementById('select_time2');

        var mt_selected=utils.hasClass(movies_tip.parentNode,'selected');
        var sf_selected=utils.hasClass(searcherplaefix.parentNode,'selected');

        /*   if(mt_selected){console.log('234')
         }else{
         document.getElementById('select_time').disabled=true;
         console.log('111')
         }*/

        console.log(movies_tip.parentNode.className);
        console.log(searcherplaefix.parentNode.className);
        console.log(utils.hasClass(movies_tip.parentNode,'on'));
        console.log(utils.hasClass(searcherplaefix.parentNode,'select_cinema'));

    }()



    //��һ���ֲ�ͼ
    ~function () {
        var banner = document.getElementById('banner');
        var inner = document.getElementById('inner');
        var tips = document.getElementById('tips');
        var oLis=tips.getElementsByTagName('li');
        var imgList = inner.getElementsByTagName('img');
        var oDiv = inner.getElementsByTagName('div');
        var leftbtn=document.getElementById('leftbtn');
        var rightbtn=document.getElementById('rightbtn');
        function imgDelay() {
            for (var i = 0; i < imgList.length; i++) {
                ~function (i) {
                    var curImg = imgList[i];
                    var tempImg = new Image;
                    tempImg.src = curImg.getAttribute('trueSrc');
                    tempImg.onload = function () {
                        curImg.src = this.src;
                        curImg.style.display = 'block';
                        if (i === 0) {
                            var curDiv = curImg.parentNode;
                            curDiv.style.zIndex = '1';
                            zhufengAnimate(curDiv, {opacity: 1}, 100)
                        }
                    }
                }(i)

            }
        }

        window.setTimeout(imgDelay, 5000);

        var step = 0;

        function automove() {
            if (step == imgList.length - 1) {
                step = -1;
            }
            step++;
            setbanner();
        }

        var timer=setInterval(automove, 5000);

        function setbanner() {
            for (var i = 0; i < oDiv.length; i++) {
                var curDiv = oDiv[i];
                if (i === step) {
                    curDiv.style.zIndex = '1';
                    utils.css(curDiv, 'zIndex', 10);
                    banner.style.backgroundImage = 'url(' + imgList[i].getAttribute('bgSrc') + ')';
                    zhufengAnimate(curDiv, {opacity: 1}, 100, function () {
                        var divSib = utils.siblings(this);
                        for (var k = 0; k < divSib.length; k++) {
                            zhufengAnimate(divSib[k], {opacity: 0}, 100)
                        }
                    });
                    continue;
                }
                curDiv.style.zIndex = '0';
                focus();
            }
        }
        function focus(){
            for(var i=0;i<oLis.length;i++){
                var curLi=oLis[i];
                var tempstep=step>=oLis.length?0:step;
                tempstep==i?curLi.className='on':curLi.className="";
            }
        }
        for(var i=0;i<oLis.length;i++) {
            var curLi = oLis[i];
            curLi.index=i;
            curLi.onclick= function () {
                step = this.index;
                setbanner();
                focus();
            }
        }


        banner.onmouseover= function () {
            clearInterval(timer);

        }
        banner.onmouseout= function () {
            timer=setInterval(automove,5000);
        }
        leftbtn.onclick= function () {
            if(step==0){
                step=oLis.length;
                setbanner();
                focus();
            }
            step--;
            setbanner();
            focus();
        };
        rightbtn.onclick=automove;

















    }()



//�ڶ����ֲ�ͼ
    ~function () {
        var banner2 = document.getElementById('banner2');
        var inner2 = document.getElementById('inner2');
        var tmcinner=inner2.getElementsByClassName('tmcinner')[0];
        var tips2 = document.getElementById('tips2');
        var oLis=tips2.getElementsByTagName('li');
        var imgList = tmcinner.getElementsByTagName('img');
        var oDiv = tmcinner.getElementsByTagName('div');
        var leftbtn2=document.getElementById('leftbtn2');
        var rightbtn2=document.getElementById('rightbtn2');
        var bigbg=banner2.getElementsByClassName('bigbg')[0];
        var nbs=banner2.getElementsByClassName('news_bg');

        function imgDelay() {
            for (var i = 0; i < imgList.length; i++) {
                ~function (i) {
                    var curImg = imgList[i];
                    var tempImg = new Image;
                    tempImg.src = curImg.getAttribute('trueSrc');
                    tempImg.onload = function () {
                        curImg.src = this.src;
                        curImg.style.display = 'block';
                        if (i === 0) {
                            var curDiv = curImg.parentNode;
                            curDiv.style.zIndex = '1';
                            zhufengAnimate(curDiv, {opacity: 1}, 300)
                        }
                    }
                }(i)

            }
        }

        window.setTimeout(imgDelay, 5000);


        var step = 0;
        function automove() {
            if (step == imgList.length - 1) {
                step = -1;
            }
            step++;
            setbanner();
        }

        var timer=setInterval(automove, 5000);

        function setbanner() {
            for (var i = 0; i < oDiv.length; i++) {
                var curDiv = oDiv[i];
                if (i === step) {
                    curDiv.style.zIndex = '1';
                    utils.css(curDiv, 'zIndex', 10);
                    bigbg.style.backgroundImage = 'url(' + imgList[i].getAttribute('bgSrc') + ')';
                    zhufengAnimate(curDiv, {opacity: 1}, 100, function () {
                        var divSib = utils.siblings(this);
                        for (var k = 0; k < divSib.length; k++) {
                            zhufengAnimate(divSib[k], {opacity: 0}, 100)
                        }
                    });
                    continue;
                }
                curDiv.style.zIndex = '0';
                focus();
            }
        }
        function focus(){
            for(var i=0;i<oLis.length;i++){
                var curLi=oLis[i];
                var tempstep=step>=oLis.length?0:step;
                tempstep==i?curLi.className='on':curLi.className="";
                if(tempstep==i){
                    utils.addClass(nbs[i].parentNode,'active')
                    for(var j=0;j<nbs.length;j++){
                        if(j!=i){
                            utils.removeClass(nbs[j].parentNode,'active')
                        }
                    }

                }
            }
        }
        for(var i=0;i<oLis.length;i++) {
            var curLi = oLis[i];
            curLi.index=i;
            curLi.onclick= function () {
                step = this.index;
                setbanner();
                focus();
            }
        }


        banner2.onmouseover= function () {
            clearInterval(timer);

        }
        banner2.onmouseout= function () {
            timer=setInterval(automove,5000);
        }
        leftbtn2.onclick= function () {
            if(step==0){
                step=oLis.length;
                setbanner();
                focus();
            }
            step--;
            setbanner();
            focus();
        };
        rightbtn2.onclick=automove;


    }()



//�������ֲ�ͼ

    ~function () {
        var banner3 = document.getElementById('i_newshead');
        var leftbtn3 = document.getElementById('leftbtn3');
        var rightbtn3 = document.getElementById('rightbtn3');
        var imgList = banner3.getElementsByClassName('inbimg');
        var stips = document.getElementById('stips3');
        var oLis=stips.getElementsByTagName('li');
        var iNewsheadCenter = document.getElementById('i_newshead_center');
        var oulList = iNewsheadCenter.getElementsByTagName('ul');
        var i_newshead_bgi=document.getElementById('i_newshead_bgi');
        var step = 0;

        function automove() {
            if (step == imgList.length - 1) {
                step = -1;
            }
            step++;
            setbanner();
        }

        var timer = setInterval(automove, 5000);

        function setbanner() {
            for (var i = 0; i < oulList.length; i++) {
                var curoul = oulList[i];
                if (i === step) {
                    curoul.style.zIndex = '1';
                    utils.css(curoul, 'zIndex', 10);
                    //curDl.style.backgroundImage= 'url(' + mspic[i].getAttribute('trueSrc') + ')';
                    i_newshead_bgi.style.backgroundImage="url("+imgList[i].getAttribute('bgSrc')+")";
                    zhufengAnimate(curoul, {opacity: 1}, 100, function () {
                        var divSib = utils.siblings(this);
                        for (var k = 0; k < divSib.length; k++) {
                            zhufengAnimate(divSib[k], {opacity: 0}, 100)
                        }
                    });
                    continue;
                }
                curoul.style.zIndex = '0';
                focus();
            }
        }

        function focus() {
            for (var i = 0; i < oLis.length; i++) {
                var curLi = oLis[i];
                var tempstep = step >= oLis.length ? 0 : step;
                tempstep == i ? curLi.className = 'on' : curLi.className = "";
            }
        }

        for (var i = 0; i < oLis.length; i++) {
            var curLi = oLis[i];
            curLi.index = i;
            curLi.onclick = function () {
                step = this.index;
                setbanner();
                focus();
            }
        }


        banner3.onmouseover = function () {
            clearInterval(timer);

        }
        banner3.onmouseout = function () {
            timer = setInterval(automove, 5000);
        }
        leftbtn3.onclick = function () {
            if (step == 0) {
                step = oLis.length;
                setbanner();
                focus();
            }
            step--;
            setbanner();
            focus();
        };
        rightbtn3.onclick = automove;


    }()









































//  ħ���ֲ�ͼ
    ~function () {
        var MTTSR = document.getElementById('MTTSR');
        var leftbtn7 = document.getElementById('leftbtn7');
        var rightbtn7 = document.getElementById('rightbtn7');
        var dlList = MTTSR.getElementsByTagName('dl');
        var im_dots = document.getElementById('im_dot');
        var oLis = im_dots.getElementsByTagName('li');
        var mspic=MTTSR.getElementsByClassName('moshoutupian');
        console.log(mspic[0].getAttribute('trueSrc'))
        var step = 0;
        function automove() {
            if (step == dlList.length - 1) {
                step = -1;
            }
            step++;
            setbanner();
        }

        var timer = setInterval(automove, 5000);

        function setbanner() {
            for (var i = 0; i < dlList.length; i++) {
                var curDl= dlList[i];
                if (i === step) {
                    console.log(i)
                    curDl.style.zIndex = '1';
                    utils.css(curDl, 'zIndex', 10);
                    curDl.style.backgroundImage= 'url(' + mspic[i].getAttribute('trueSrc') + ')';
                    console.log(curDl.style.backgroundImage)
                    zhufengAnimate(curDl, {opacity: 1}, 100, function () {
                        var divSib = utils.siblings(this);
                        for (var k = 0; k < divSib.length; k++) {
                            zhufengAnimate(divSib[k], {opacity: 0}, 100)
                        }
                    });
                    continue;
                }
                curDl.style.zIndex = '0';
                focus();
            }
        }

        function focus() {
            for (var i = 0; i < oLis.length; i++) {
                var curLi = oLis[i];
                var tempstep = step >= oLis.length ? 0 : step;
                tempstep == i ? curLi.className = 'on' : curLi.className = "";
            }
        }

        for (var i = 0; i < oLis.length; i++) {
            var curLi = oLis[i];
            curLi.index = i;
            curLi.onclick = function () {
                step = this.index;
                setbanner();
                focus();
            }
        }


        MTTSR.onmouseover = function () {
            clearInterval(timer);

        }
        MTTSR.onmouseout = function () {
            timer = setInterval(automove, 5000);
        }
        leftbtn7.onclick = function () {
            if (step == 0) {
                step = oLis.length;
                setbanner();
                focus();
            }
            step--;
            setbanner();
            focus();
        };
        rightbtn7.onclick = automove;



    }()


//С���ֲ�ͼ
    ~function()  {
        var leftbtn5=document.getElementById('leftbtn5');
        var rightbtn5=document.getElementById('rightbtn5');
        var upcomingSlide=document.getElementById('upcomingSlide');

        var step=0;
        leftbtn5.onclick= function () {
            if(step==3){
                step=0;
            }
            step++;
            zhufengAnimate(upcomingSlide,{left: -step*940}, 100)
        }
        rightbtn5.onclick= function () {
            if(step==0){
                step=3;
            }
            step--;
            zhufengAnimate(upcomingSlide,{left: -step*940}, 100)
        }

    }()



    ~function()  {
        var leftbtn6=document.getElementById('leftbtn6');
        var rightbtn6=document.getElementById('rightbtn6');
        var rpbanner=document.getElementById('rpbanner');

        var step=0;
        leftbtn6.onclick= function () {
            if(step==2){
                step=0;
            }
            step++;
            zhufengAnimate(rpbanner,{left: -step*685}, 100)
        }
        rightbtn6.onclick= function () {
            if(step==0){
                step=2;
            }
            step--;
            zhufengAnimate(rpbanner,{left: -step*685}, 100)
        }

    }()





























}()
