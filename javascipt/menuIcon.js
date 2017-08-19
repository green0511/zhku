/**
 * Created by Green on 2015/5/8.
 */
window.onload = function () {
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