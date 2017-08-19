/**
 * Created by Green on 2015/5/9.
 */
window.onload = function(){
    imgLocation("container","box");
    function imgLocation(parent,content){
        var cparent = document.getElementById(parent);
        var ccontent = getChildElement(cparent,content);
        var imgWidth = ccontent[0].offsetWidth;
        var num = Math.floor(cparent.offsetWidth/imgWidth);
        //cparent.style.cssText = "width:" + imgWidth * num + "px;margin:0 auto";

        var BoxHeightArr = [];
        for(var i = 0;i < ccontent.length;i++ ){
            if(i < num){
                BoxHeightArr[i] = ccontent[i].offsetHeight;
            }else{
                var minHeight = Math.min.apply(null,BoxHeightArr);
                var minIndex = getMinHeightLocation(BoxHeightArr,minHeight);
                ccontent[i].style.position = "absolute";
                ccontent[i].style.top = minHeight + "px";
                ccontent[i].style.left = ccontent[minIndex].offsetLeft + "px";
                BoxHeightArr[minIndex] = BoxHeightArr[minIndex] + ccontent[i].offsetHeight;
            }
        }
    }

    function getMinHeightLocation(BoxHeightArr,minHeight){
        for(var i in BoxHeightArr){
            if(BoxHeightArr[i] == minHeight){
                return i;
            }
        }
    }
    function getChildElement(parent,content){
        var contentArr= [];
        var allcontent = parent.getElementsByTagName("*");
        for(var i = 0; i < allcontent.length;i++){
            if(allcontent[i].className == content){
                contentArr.push(allcontent[i]);
            }
        }
        return contentArr;
    }
}