~function () {
    //所有表单非空验证
    ~function () {
        var oinput1=document.getElementById('input1');
        var oinput2=document.getElementById('input2');
        var oinput3=document.getElementById('input3');
        var oinput4=document.getElementById('input4');
        var oinput5=document.getElementById('input5');
        var oinput6=document.getElementById('input6');
        var oinput7=document.getElementById('input7');
        var oinput8=document.getElementById('input8');
        var oinput9=document.getElementById('input9');
        var oinput10=document.getElementById('input10');
        var nottrue1=document.getElementById('nottrue1');
        var nottrue2=document.getElementById('nottrue2');
        var nottrue3=document.getElementById('nottrue3');
        var nottrue4=document.getElementById('nottrue4');
        var nottrue5=document.getElementById('nottrue5');
        var nottrue6=document.getElementById('nottrue6');
        var nottrue7=document.getElementById('nottrue7');
        var nottrue8=document.getElementById('nottrue8');
        var nottrue9=document.getElementById('nottrue9');
        var nottrue10=document.getElementById('nottrue10');
        var reg_smscodeBtn=document.getElementById('reg_smscodeBtn');
        console.log(reg_smscodeBtn.innerHTML)
        console.log(oinput8.value)
        function runinput(curinput,nottrue){
                curinput.onfocus= function () {
                    if(this.value==this.defaultValue){
                        this.value='';
                    }
                }
                curinput.onblur= function () {
                    var reg=/^\s*$/;
                    if(reg.test(this.value)){
                        this.value=this.defaultValue;
                    }
                    if(this.value==this.defaultValue){
                        nottrue.style.display='block';
                    }else{
                        nottrue.style.display='none';
                    }
                }
        }
        runinput(oinput1,nottrue1)
        runinput(oinput2,nottrue2)
        runinput(oinput3,nottrue3)
        runinput(oinput4,nottrue4)
        runinput(oinput5,nottrue5)
        runinput(oinput6,nottrue6)
        runinput(oinput7,nottrue7)
       /* runinput(oinput8,nottrue8)*/
        runinput(oinput9,nottrue9)
        runinput(oinput10,nottrue10)



            oinput8.onfocus= function () {
                if(this.value==this.defaultValue){
                    this.value='';
                }
            }
            oinput8.onblur= function () {
                var reg=/^\s*$/;
                if(reg.test(this.value)){
                    this.value=this.defaultValue;
                }
                if(this.value==this.defaultValue){
                    nottrue8.style.display='block';
                }else if(this.value.toUpperCase()!==reg_smscodeBtn.innerHTML.toUpperCase()){
                    console.log(reg_smscodeBtn.innerHTML)
                    console.log(oinput8.value)
                    nottrue8.style.display='block';
                }else{
                    nottrue8.style.display='none';
                }

        }


    }()

//选项卡操作
    ~function () {
        var loginleft_ul=document.getElementById('loginleft_ul');
        var oLis=loginleft_ul.getElementsByTagName('li');
        var loginleft=document.getElementById('loginleft');
        var oDiv=loginleft.getElementsByClassName('res');
        console.log(oLis);
        for(var i=0;i<oLis.length;i++){
            var curLi=oLis[i]
            curLi.index=i;
             curLi.onclick= function () {
            tab(this.index);
        }
        }
        function tab(n){
            for(var i=0;i<oLis.length;i++){
                oLis[i].className='';
                oDiv[i].className='res';
            }
            oLis[n].className='on';
            oDiv[n].className='res on';
        }
    }()
    //点击显示验证码
    ~function () {
        var oinput8=document.getElementById('input8');
        var shuaxin=document.getElementById('shuaxin');
        var reg_smscodeBtn=document.getElementById('reg_smscodeBtn');
         shuaxin.rs=reg_smscodeBtn.innerHTML;
        oinput8.onclick= function () {
            var isbok=shuaxin.style.display;
            if(isbok=='block'){

            }else{
                shuaxin.style.display='block';
                reg_smscodeBtn.style.display='block';
            }
        }
        var strRange="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        shuaxin.onclick=function(){
            getCode();
        }
        function getCode(){
            var str="";
            for(var i=0;i<4;i++){
                var ran=Math.round(Math.random()*(61-0)+0);
                var ranChar=strRange.charAt(ran);
                str+=ranChar;
            }
            reg_smscodeBtn.innerHTML=str;
        }
        getCode();

    }()
    //购物车
    ~function () {
        var shoppingcar=document.getElementById('shoppingcar');
        var oshop=document.getElementById('shoppimgdetail')
        shoppingcar.onmouseenter= function (e) {
            oshop.style.display='block';
        }
        shoppingcar.onmouseleave= function (e) {
            oshop.style.display = 'none';
        }
    }()
        //二维码
    ~function () {
        var phone=document.getElementById('phone');
        var erweima=document.getElementById('erweima');


        phone.onmouseover= function () {
            erweima.style.display='block';
        }
        phone.onmouseout= function () {
            erweima.style.display='none';
        }


    }()


















}()























