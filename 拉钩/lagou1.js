/**
 * Created by Alice on 2016/5/20.
 */

// 轮播图
(function () {
    var oDiv = document.getElementById("home_banner");
    var oUl = oDiv.getElementsByTagName("ul")[0];
    var oLis = oUl.getElementsByTagName("li");
    var oEm = oDiv.getElementsByTagName("em")[0];
    var oUl2 = document.getElementById("thumbs");
    var oLis2 = oUl2.getElementsByTagName("li");
    var oIs = oUl2.getElementsByTagName("i");
    var step1 = 0;
    var step2 = 0;
    var interval = 2000;
    var autoTimer = window.setInterval(autoMove, interval);

    function autoMove() {
        step1++;
        step2++;
        if (step1 >= oLis.length) {
            oUl.style.top = 0;
            step1 = 1;
        }
        if (step2 >= oLis2.length) {
            step2 = 0;
        }
        zhufengAnimate(oUl, {top: -step1 * 160}, 500);
        zhufengAnimate(oEm, {top: step2 * 55}, 300);
        changeTip();
    }

    function changeTip() {
        var temStep = step2 >= oLis2.length ? 0 : step2;
        for (var i = 0; i < oLis2.length; i++) {
            var curI = oIs[i];
            i === temStep ? curI.style.display = 'none' : curI.style.display = 'block';
        }
    }

    on(oUl, "mouseover", function () {
        clearInterval(autoTimer);
    });
    on(oUl, "mouseout", function () {
        autoTimer = window.setInterval(autoMove, interval);
    });

    for (var i = 0; i < oIs.length; i++) {
        var curI = oIs[i];
        +function (i) {
            on(curI, "mouseover", function () {
                step1 = i;
                step2 = i;
                if (step1 >= oLis.length) {
                    oUl.style.top = 0;
                    step1 = 1;
                }
                if (step2 >= oLis2.length) {
                    step2 = 0;
                }
                zhufengAnimate(oUl, {top: -step1 * 160}, 500);
                zhufengAnimate(oEm, {top: step2 * 55}, 300);
                changeTip();
            });
        }(i);
    }
})();
// 选项卡
(function () {
    var oDiv = document.getElementsByClassName("lg_left_menubox");
    var oDiv1 = document.getElementsByClassName("lg_left_menumain");
    var oDiv2 = document.getElementsByClassName("lg_left_menushow");
    for (var i = 0; i < oDiv.length; i++) {
        var curDiv = oDiv[i];
        +function (i) {
            on(curDiv, "mouseover", function () {
                change1(i)
            });
            on(curDiv, "mouseout", function () {
                change2(i)
            })
        }(i);
    }

    function change1(i) {
        for (var j = 0; j < oDiv1.length; j++) {
            if (i === j) {
                var curoDiv1 = oDiv1[j];
                var curoDiv2 = oDiv2[j];
                utils.setCss(curoDiv1, "width", 208);
                utils.setCss(curoDiv1, "z-index", 102);
                utils.setCss(curoDiv1, "background-color", "#fff");
                utils.setCss(curoDiv1, "border-color", "#c9cbce");
                utils.setCss(curoDiv1, "border-right", 0);
                utils.setCss(curoDiv2, "display", "block");
            }
        }
    }

    function change2(i) {
        for (var j = 0; j < oDiv1.length; j++) {
            if (i === j) {
                var curoDiv1 = oDiv1[j];
                var curoDiv2 = oDiv2[j];
                utils.setCss(curoDiv1, "width", "auto");
                utils.setCss(curoDiv1, "z-index", "auto");
                utils.setCss(curoDiv1, "background-color", "inherit");
                utils.setCss(curoDiv1, "border-color", "#fafafa");
                utils.setCss(curoDiv1, "border-right", 0);
                utils.setCss(curoDiv2, "display", "none");
            }
        }
    }
})();

// 遮罩层
(function () {
    var oUl = document.getElementById("da-thumbs");
    var oLis = oUl.getElementsByTagName("li");
    var oDiv = oUl.getElementsByTagName("div");

    function direction(pageX, pageY) {
        var liOffset = utils.offset(this),
            liWidth = this.offsetWidth,
            liHeight = this.offsetHeight;

        var disX = pageX - liOffset.left - (liWidth / 2);
        var disY = pageY - liOffset.top - (liHeight / 2);

        var val = Math.atan2(disY, disX) * (180 / Math.PI);
        if (-135 < val && val < -45) {
            return 0;
        } else if (-45 < val && val < 45) {
            return 1;
        } else if (45 < val && val < 135) {
            return 2;
        } else {
            return 3;
        }
    }

    for (var i = 0; i < oLis.length; i++) {
        (function (i) {
            oLis[i].onmouseenter = move;
            oLis[i].onmouseleave = move;
        })(i)
    }


    function move(e) {
        e = e || window.event;
        var cur1 = this.getElementsByTagName("div");
        if (e.type === "mouseenter") {
            switch (direction.call(this, e.pageX, e.pageY)) {
                case 0:
                    cur1[0].style.top = "-113px";
                    cur1[0].style.left = 0;
                    cur1[0].style.display = "block";
                    zhufengAnimate(cur1[0], {top: 0}, 150);
                    break;
                case 1:
                    cur1[0].style.top = 0;
                    cur1[0].style.left = "113px";
                    cur1[0].style.display = "block";
                    zhufengAnimate(cur1[0], {left: 0}, 150);
                    break;
                case 2:
                    cur1[0].style.top = "113px";
                    cur1[0].style.left = 0;
                    cur1[0].style.display = "block";
                    zhufengAnimate(cur1[0], {top: 0}, 150);
                    break;
                case 3:
                    cur1[0].style.top = 0;
                    cur1[0].style.left = "-113px";
                    cur1[0].style.display = "block";
                    zhufengAnimate(cur1[0], {left: 0}, 150);
                    break;
            }
        } else if (e.type === "mouseleave") {
            switch (direction.call(this, e.pageX, e.pageY)) {
                case 0:
                    zhufengAnimate(cur1[0], {top: -113}, 150, function () {
                        cur1[0].style.display = "none";
                    });

                    break;
                case 1:
                    zhufengAnimate(cur1[0], {left: 113}, 150, function () {
                        cur1[0].style.display = "none";
                    });
                    break;
                case 2:
                    zhufengAnimate(cur1[0], {top: 113}, 150, function () {
                        cur1[0].style.display = "none";
                    });
                    break;
                case 3:
                    zhufengAnimate(cur1[0], {left: -113}, 150, function () {
                        cur1[0].style.display = "none";
                    });
                    break;
            }
        }

    }


})();


// 回到顶部

(function () {
    var backTop = document.getElementById("backtop");
    on(window, "scroll", function (e) {
        if (utils.getWin("scrollTop") > 0) {
            backTop.style.display = 'block';
        } else {
            backTop.style.display = 'none';
        }
    });
    // window.onscroll = function () {
    //     if (utils.getWin("scrollTop") > 0) {
    //         backTop.style.display = 'block';
    //     } else {
    //         backTop.style.display = 'none';
    //     }
    // };
    on(backTop, "click", function () {
        var curEle = document.getElementsByTagName("body")[0];
        var curScrollTop = curEle.scrollTop;
        var durTime = 500;
        var interval = 10;
        var step = curScrollTop * interval / durTime;
        curEle.timer = window.setInterval(function () {
            if (curEle.scrollTop - step <= 0) {
                window.clearInterval(curEle.timer);
                curEle.scrollTop = 0;
                return;
            }
            curEle.scrollTop -= step;
        }, interval)
    });
})();

// 底部登录
(function () {
    var bottomEnter = document.getElementById("loginToolBar");
    on(window, "scroll", function (e) {
        var totallHeight = window.document.body.offsetHeight;
        var clientH = utils.getWin("clientHeight");
        var scrollBottomVal = totallHeight - clientH - utils.getWin("scrollTop");
        if (scrollBottomVal <= 68) {
            utils.setCss(bottomEnter, "bottom", 68 - scrollBottomVal)
        } else {
            utils.setCss(bottomEnter, "bottom", 0)
        }
    });
//     window.onscroll = function (e) {
//         var totallHeight = window.document.body.offsetHeight;
//         var clientH = utils.getWin("clientHeight");
//         var scrollBottomVal = totallHeight - clientH - utils.getWin("scrollTop");
// if(scrollBottomVal<=68){
//     utils.setCss(bottomEnter,"bottom",68-scrollBottomVal)
// }else {
//     utils.setCss(bottomEnter,"bottom",0)
// }
//     };
})();

// 二维码hover
(function () {
    var footApp = document.getElementsByClassName("footer_app")[0];
    var appPic = footApp.getElementsByTagName("img")[0];
    var appNew = footApp.getElementsByTagName("span")[0];
    on(footApp, "mouseover", function (e) {
        e = e || window.event;
        if (e.target == footApp || e.target == appPic || e.target == appNew)
            utils.setCss(appPic, "display", "block");
        zhufengAnimate(appPic, {opacity: 1}, 500);
    });
    on(footApp, "mouseout", function (e) {
        utils.setCss(appPic, "display", "none");
        utils.setCss(appPic, "opacity", "0");
    })

})();
// 微信over   footer_qr
(function () {
    var footer_qr = document.getElementsByClassName("footer_qr")[0];
    var wxPic = footer_qr.getElementsByTagName("img")[0];
    on(footer_qr, "mouseover", function (e) {
        e = e || window.event;
        if (e.target == footer_qr || e.target == wxPic)
            utils.setCss(wxPic, "display", "block");
        zhufengAnimate(wxPic, {opacity: 1}, 500);
    });
    on(footer_qr, "mouseout", function (e) {
        utils.setCss(wxPic, "display", "none");
        utils.setCss(wxPic, "opacity", "0");
    })
})();

// 我要反馈弹出框
(function () {
    var feedback = document.getElementById("feedback-icon");
    var feedbackCon = document.getElementById("feedback-con");
    var pfbClose = document.getElementsByClassName("pfb-close")[0];
    on(feedback, "click", function (e) {
        utils.setCss(feedbackCon, "display", "block");
        zhufengAnimate(feedbackCon, {opacity: 1}, 300);
    });
    on(pfbClose, "click", function (e) {
        utils.setCss(feedbackCon, "display", "none");
        utils.setCss(feedbackCon, "opacity", "0");
    })
})();

// 职位切换
(function () {
    var jobList = document.getElementById("job_tab");
    var jobLis = jobList.getElementsByTagName("li");
    var hotList = document.getElementById("hotList");
    var newList = document.getElementById("newList");

    on(jobLis[0], "click", function (e) {
        e = e || window.event;
        utils.setCss(hotList, "display", "block");
        utils.setCss(newList, "display", "none");
        utils.addClass(jobLis[0], "current");
        utils.removeClass(jobLis[1], "current");
    });
    on(jobLis[1], "click", function (e) {
        e = e || window.event;
        utils.setCss(newList, "display", "block");
        utils.setCss(hotList, "display", "none");
        utils.addClass(jobLis[1], "current");
        utils.removeClass(jobLis[0], "current");
    })
})();

// 搜索栏
(function () {
    var search = document.getElementsByClassName("search_input")[0];
    on(search, "focus", function (e) {
        this["placeholder"] = "搜索职位、公司或地点";
    });
    on(search, "blur", function (e) {
        this["placeholder"] = "视觉设计";
    })
})();

// 底部登入数字滚动效果
(function () {
    var companycount = document.getElementsByClassName('companycount')[0];
    var companycountNum = companycount.getElementsByTagName("i");
    var positioncount = document.getElementsByClassName('positioncount')[0];
    var positioncountNum = positioncount.getElementsByTagName("i");
    var val=function (a,b) {
          return  -Math.round(Math.random()*(a-b)+b)*30+"px";
        };
    utils.setGroupCss(companycountNum[0],{backgroundPositionY:"-30px",transition:"2s"});
    utils.setGroupCss(companycountNum[1],{backgroundPositionY:"-60px",transition:"2s"});
    utils.setGroupCss(companycountNum[2],{backgroundPositionY:"-90px",transition:"2s"});
    utils.setGroupCss(companycountNum[3],{backgroundPositionY:val(0,9),transition:"2s"});
    utils.setGroupCss(companycountNum[4],{backgroundPositionY:val(0,9),transition:"2s"});
    utils.setGroupCss(companycountNum[5],{backgroundPositionY:val(0,9),transition:"2s"});
    utils.setGroupCss(positioncountNum[0],{backgroundPositionY:"-30px",transition:"2s"});
    utils.setGroupCss(positioncountNum[1],{backgroundPositionY:"-240px",transition:"2s"});
    utils.setGroupCss(positioncountNum[2],{backgroundPositionY:"-210px",transition:"2s"});
    utils.setGroupCss(positioncountNum[3],{backgroundPositionY:"0px",transition:"2s"});
    utils.setGroupCss(positioncountNum[4],{backgroundPositionY:val(0,9),transition:"2s"});
    utils.setGroupCss(positioncountNum[5],{backgroundPositionY:val(0,9),transition:"2s"});
    utils.setGroupCss(positioncountNum[6],{backgroundPositionY:val(0,9),transition:"2s"});
})();






