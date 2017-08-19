/**
 * Created by Green on 2015/4/18.
 */
(function($){
    var defaults = {
        'container': 'main-container',
        'sections': 'section',
        'easing': 'ease',
        'duration': 1000,
        'pagination': true,
        'loop': false,
        'keyboard': true,
        'direction': 'vertical',
        'onpageSwitch': function (pagenum) {}
    };
    var win = $(window),
        container,sections;
    var opts = {},
        canScroll = true;
    var iIndex = 0;

    var arrElements = [];

    var SP = $.fn.switchPage = function(options){
        opts = $.extend({},defaults,options||{});
        container = $(opts.container),
        sections = container.find(opts.sections);
        sections.each(function(){
            arrElements.push($(this));
        });

        return this.each(function(){
            if(opts.direction == "horizontal"){
                initLayout();
            }
        })
    }

    SP.moveSectionUp =  function(){
        if(iIndex){
            iIndex--;
        }else if(opts.loop){
            iIndex = arrElements.length - 1;
        }
        scrollPage(arrElements[iIndex]);
    };

    SP.moveSectionDown = function(){
        if(iIndex < (arrElements.length - 1)){
            iIndex ++;
        }else if(opts.loop){
            iIndex = 0;
        }
        scrollPage(arrElements[iIndex]);
    };
    function scrollPage(element){
        var dest = element.position();
        if(typeof dest === 'undefined'){
            return;
        }
        initEffects(dest,element);
    }

    $(document).on("mousewheel DOMMouseScroll",MouseWheelHandler);
    function MouseWheelHandler(e){
        e.preventDefault();
        var value = e.originalEvent.wheelDelta || -e.originalEvent.detail;
        var delta = Math.max(-1,Math.min(1,value));
        if(canScroll){
            if(delta < 0){
                SP.moveSectionDown();
            }else{
                SP.moveSectionUp();
            }
        }
        return false;
    }

    function initLayout(){
        var length = sections.length,
            width = (length*100) + "%",
            cellWidth = (100/length).toFixed(2) + "%";
        container.width(width).addClass("left");
        sections.width(cellWidth).addClass("left");
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

    function initEffects(dest,element){
        var transform = ["-webkit-transform","-ms-transform","-moz-transform","transform"],
            transition = ["-webkit-transition","-ms-transition","-moz-transition","transition"];

        canScroll = false;
        if(isSupportCss(transform) && isSupportCss(transition)){
            var traslate = "";
            if(opts.direction == "horizontal"){
                traslate = "_" + dest.left + "px, 0px, 0px";
            }else{
                traslate = "0px, -"+dest.top + "px, 0px";
            }
            container.css({
               "transition":"all" + opts.duration + "ms " + opts.easing,
                "transform":"translate3d(" + traslate + ")"
            });
            container.on("webkitTransitionEnd msTransitionend mozTransitionend transitionend",function(){
                canScroll = true;
            });
        }else{
            var cssObj = (opts.direction == "horizontal")?{left: -dest.left}:{top: -dest.top};
        }
        element.addClass("active").sibling().removeClass("active");
        if(opts.pagination){
            paginationHandler();
        }
    }

    var resizeId;
    win.resize(function(){
        clearTimeout(resizeId);
        resizeId = setTimeout(function(){
            reBuild();
        },500);
    });

    function reBuild(){
        var currentHeight = win.height(),
            currentWidth = win.width();

        var element = arrElements[iIndex];
        if(opts.direction == "horizontal"){
            var offsetLeft = element.offset().left;
            if(Math.abs(offsetLeft) > currentWidth/2 && iIndex < (arrElements.length - 1)){
                iIndex ++;
            }
        }else{
            var offsetTop = element.offset().top;
            if(Math.abs(offsetTop) > currentHeight/2 && iIndex < (arrElements.length - 1)){
                iIndex ++;
            }
        }
        if(iIndex){
            paginationHandler();
            var cuerrentElement = arrElements[iIndex],
                dest = cuerrentElement.position();
            initEffects(dest,cuerrentElement);
        }
    }
})(jQuery);
