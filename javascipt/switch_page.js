/**
 * Created by Green on 2015/4/19.
 */

var container = $("#main-container");
var t = null;
var arrElements = [];
var element1 = document.getElementById("page-1");
var iIndex = 0;
var sections =  $(".section");

$(document).on("mousewheel DOMMouseScroll",scrollPageM);//jQuery监听
function scrollPageM(e){
    sections.each(function(){
        arrElements.push($(this));
    });
    e.preventDefault();
    var value = e.originalEvent.wheelDelta || -e.originalEvent.detail;
    var delta = Math.max(-1,Math.min(1,value));
    if(delta < 0){
        moveSectionDown();
    }else{
        moveSectionUp();
    }
}
function moveSectionUp(){
    if(iIndex){
        iIndex--;
    }else if(opts.loop){
        iIndex = arrElements.length - 1;
    }
    scrollPage(arrElements[iIndex]);
}

function moveSectionDown(){
        if(iIndex < (arrElements.length - 1)){
            iIndex ++;
        }else{
            iIndex = 0;
        }
        scrollPage(arrElements[iIndex]);

}
function scrollPage(element){
    var dest = element.position();
    if(typeof dest === 'undefined'){
        return;
    }
    initEffects(dest,element);
}
var canScroll = true;
function initEffects(dest,element){
    var transform = ["-webkit-transform","-ms-transform","-moz-transform","transform"],
        transition = ["-webkit-transition","-ms-transition","-moz-transition","transition"];

    canScroll = false;
    if(isSupportCss(transform) && isSupportCss(transition)){
        var traslate = "0px, -"+dest.top + "px";

        container.css({
            "transition":"top" + "0.5s" + "ease",
            "transform":"translate(" + traslate + ")"
        });
        container.on("webkitTransitionEnd msTransitionend mozTransitionend transitionend",function(){
            canScroll = true;
        });
    }else{
        var cssObj = {top: -dest.top};
    }
    //element.addClass("active").sibling().removeClass("active");
}

function isSupportCss(property){
    var body = $("body")[0];
    for(var i = 0;i < property.length; i++){
        if(property[i] in body.style){
            return true;
        }
    }
    return false;
}