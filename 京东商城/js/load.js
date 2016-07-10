/**
 * Created by Alice on 2016/6/2.
 */
!function () {
/*我好强啊*/
    var username=document.getElementById("username");
    var password=document.getElementById("password");
    var loadBtn=document.getElementById("loadBtn");
    var errWrap=document.getElementById("errWrap");
    var loadForm=document.getElementById("loadForm");
    var usernameInput=document.getElementById("usernameInput");
    var passwordInput=document.getElementById("passwordInput");
    loadForm.onclick=function (e) {
        e=e||window.event;/*我好强啊*/
        e.target=e.target||e.srcElement;
        var tarTag=e.target.tagName.toLowerCase();
        if(e.target.parentNode.id=="username")
        {
            utils.addClass(e.target.parentNode,"focus");
            //console.log(utils.myChildren(e.target.parentNode,"i"))
            utils.css(utils.myChildren(e.target.parentNode,"i")[0],"display","block");
        }/*我好强啊*/
        else if(e.target.id=="username")
        {
            utils.addClass(e.target,"focus");
        }
        else{
            utils.removeClass(username,"focus");
            utils.css(utils.myChildren(username,"i")[0],"display","none");
        }
        if(e.target.parentNode.id=="password")
        {
            utils.addClass(e.target.parentNode,"focus");
            utils.css(utils.myChildren(e.target.parentNode,"i")[0],"display","block");
        }
        else if(e.target.id=="password")
        {
            utils.addClass(e.target,"focus");
        }
        else{
            utils.removeClass(password,"focus");
            utils.css(utils.myChildren(password,"i")[0],"display","none");
        }



        /*我好强啊*/
    };
    /*我好强啊*/
    var clearUsername=document.getElementById('clearUsername');
    clearUsername.onclick=function () {
        usernameInput.value='';
    };
    var clearPassword=document.getElementById('clearPassword');
    clearPassword.onclick=function () {
        passwordInput.value='';
    };


    var flag=true;
    loadBtn.onclick=function () {
        if(usernameInput.value!='')
        {
            /*我好强啊*/
            if(/[^a-zA-Z0-9_]/.test(usernameInput.value))
            {
                utils.css(errWrap,"opacity",1);
                utils.addClass(username,"focusErr");
                errWrap.innerHTML='<i></i>'+'用户名不合法！';
                flag=false;
            }
            if(usernameInput.value.length<5||usernameInput.value.length>20)
            {
                utils.css(errWrap,"opacity",1);
                utils.addClass(username,"focusErr");
                errWrap.innerHTML='<i></i>'+'用户名长度在5-20之间！';
                flag=false
            }
        }
        else{
            errWrap.innerHTML='<i></i>'+'请输入用户名！';
        }
        /*我好强啊*/
        if(passwordInput.value=='')
        {
            errWrap.innerHTML='<i></i>'+'请输入密码！';
            flag=false;

        }
        /*我好强啊*/
        if(flag){

            window.location.href='jd.html';

        }

    };











}();
