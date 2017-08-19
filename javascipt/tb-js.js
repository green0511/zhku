/**
 * Created by Green on 2015/4/22.
 */
window.onload = function () {
    var container = document.getElementById('top-container');
    var list = document.getElementById('top-list');
    var buttons = document.getElementById('top-buttons').getElementsByTagName('span');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var index = 1;
    var len = 4;
    var animated = false;
    var interval = 3000;
    var timer;

    function animate (offset) {
        if (offset == 0) {
            return;
        }
        animated = true;
        var time = 300;
        var inteval = 10;
        var speed = offset/(time/inteval);
        var left = parseInt(list.style.left) + offset;

        var go = function (){
            if ( (speed > 0 && parseInt(list.style.left) < left) || (speed < 0 && parseInt(list.style.left) > left)) {
                list.style.left = parseInt(list.style.left) + speed + 'px';
                setTimeout(go, inteval);
            }
            else {
                list.style.left = left + 'px';
                if(left>-200){
                    list.style.left = -840 * len + 'px';
                }
                if(left<(-840 * len)) {
                    list.style.left = '-840px';
                }
                animated = false;
            }
        }
        go();
    }


    function showButton() {
        for (var i = 0; i < buttons.length ; i++) {
            if( buttons[i].className == 'on'){
                buttons[i].className = '';
                break;
            }
        }
        buttons[index - 1].className = 'on';
    }

    function play() {
        timer = setTimeout(function () {
            next.onclick();
            play();
        }, interval);
    }
    function stop() {
        clearTimeout(timer);
    }

    next.onclick = function () {
        if (animated) {
            return;
        }
        if (index == len) {
            index = 1;
        }
        else {
            index += 1;
        }
        animate(-840);
        showButton();
    }
    prev.onclick = function () {
        if (animated) {
            return;
        }
        if (index == 1) {
            index = len;
        }
        else {
            index -= 1;
        }
        animate(840);
        showButton();
    }

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
            if (animated) {
                return;
            }
            if(this.className == 'on') {
                return;
            }
            var myIndex = parseInt(this.getAttribute('index'));
            var offset = -840 * (myIndex - index);

            animate(offset);
            index = myIndex;
            showButton();
        }
    }

    container.onmouseover = stop;
    container.onmouseout = play;

    play();

    var fix = document.getElementById("top-fix");
    var rightBar = document.getElementsByClassName("tb-right-container")[0];
    window.onscroll = function(){
        var h = document.body.scrollTop;
        if(h > 90){
            rightBar.style.marginTop = h - 90 + "px";
            fix.style.marginTop = h - 90 + "px";
        }else{
            rightBar.style.marginTop = 0 + "px";
            fix.style.marginTop = 0 + "px";
        }

    }


    var menuBtn = document.getElementById("menu-ico");
    var searchArea = document.getElementById("search-area");
    var menuList = document.getElementById("menu-list");
    menuBtn.onclick = function () {
        if (searchArea.style.display == "none") {
            searchArea.style.display = "block";
            //searchArea.style.height = "40px";

            menuList.style.display = "block";
            //menuList.style.height = "60px";
        } else {
            searchArea.style.display = "none";
            menuList.style.display = "none";
        }
    }








    var btn = document.getElementById("wrapper-btn");
    var wraCon = document.getElementById("wrapper-container");
    var timer = null;
    var easeOut = function (t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    };
    btn.onclick = function(){
        clearInterval(timer);
        if(wraCon.offsetLeft == -300){
            clearInterval(timer);
            timer = setInterval(function(){
                console.log("out");
                btn.innerHTML = "<";
                var speed = wraCon.offsetLeft/10*9;
                wraCon.style.left = speed + "px";
                if(wraCon.offsetLeft >= 0){
                    wraCon.style.left = 0;
                    clearInterval(timer);
                }
            },30)
        }else{
            clearInterval(timer);
            var temp = 0
            timer = setInterval(function(){
                console.log("in");
                btn.innerHTML = ">";
                var speed = 50;
                temp -= speed;
                wraCon.style.left = temp + "px";
                if(wraCon.offsetLeft < -300){
                    wraCon.style.left = -300 + "px";
                    clearInterval(timer);
                }
            },30)
        }
    }
}