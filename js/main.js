/*
* @Author: Marte
* @Date:   2017-09-03 11:35:54
* @Last Modified by:   Marte
* @Last Modified time: 2017-09-15 11:24:05
*/

'use strict';
$(function(){
    function reSize(){
        var screenWidth = $(window).width();
        var isSmallScreen = screenWidth < 768;
        $('#main-ad > .carousel-inner > .item').each(function(i,item){
            var $item = $(item);
            var srcImg = $item.data(isSmallScreen ? 'image-sm' : 'image-lg');
            $item.css('backgroundImage', 'url("'+ srcImg +'")');

            /*当轮播宽度小于768时，如何使轮播高度也跟着一起变化*/
            /*通过在isSmallScreen情况下加img标签的方式*/
            if(isSmallScreen){
                $item.html('<img src="'+srcImg+'">');
            }else{
                $item.empty();
            }
        });
    };
    $(window).on('resize',reSize).trigger('resize');

    /*初始化tooltips插件*/
    $('[data-toggle="tooltip"]').tooltip();

    /*
     *控制标签页的标签容器宽度
     */
    var $ulContainer = $('.nav-tabs');
    var width=30;//原本ul上有padding-left，一些border
    $ulContainer.children().each(function(i,ele){
        width += ele.clientWidth;
    });
    /*判断当前ul的宽是否超出了屏幕，超出就显示滚动条*/
    if(width>$(window).width()){
        $ulContainer.css('width',width).parent().css('overflow-x','scroll');
    }

    /*news中a点击事件*/
    $('#news .nav-pills a').on('click',function(){
        var title = $(this).data('title');
        $('#news .news-title').text(title);
    });


    /*鼠标滑动切换图片效果*/
    /*获取轮播元素*/
    var $lunbo = $('.carousel');
    var startX , endX;
    var offSet = 50;
    /*获得鼠标滑动的起点坐标,要接受一下e参数*/
    $lunbo.on('touchstart',function(e){
        startX = e.originalEvent.touches[0].clientX;
    });
    /*由于touchend是瞬间完成的，不好捕获最后的坐标，故通过touchmove获取*/
    $lunbo.on('touchmove',function(e){
        endX = e.originalEvent.touches[0].clientX;
        /*console.log(endX);*/
    });
    /*在touch结束的时候，判断一下滑动的方向*/
    $lunbo.on('touchend',function(){
        if(Math.abs(startX-endX) > offSet){
            $lunbo.carousel((startX > endX)? 'next' : 'prev');
        }
        /*console.log((-10)?1:0);*/
    });
});