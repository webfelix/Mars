/*
 * @Description: 
 * @Author: 熊伟
 * @Date: 2019-08-14 09:21:12
 * @LastEditTime: 2019-08-14 17:39:41
 * @LastEditors: 熊伟
 */
$(function(){
    var t = null;
    function initLoadingPage(){
        var percent = 0;
        t = setInterval(function(){
            if(percent == 100){
                clearInterval(t);
                setTimeout(function(){
                    $('.section').removeClass('play');
                    $('.section-home').addClass('play');
                },500)
            }else{
                percent += 1;
                $('.section-loading .percent').text(percent);
                $('.section-loading .process-percent').css('width',percent+'%');
            }
        },15)
    }
    function initEvent(){
        // 首页点击开始答题
        $('#enter-subject').click(function(){
            $('.section-home').removeClass('play');
            $('#section-subject1').addClass('play');
        });
        // 答题页点击选项进入下一页
        $('.section-subject .option-item').click(function(){
            var val = $(this).attr('val');
            var indx = Number($(this).parent('.option-list').attr('sub'));
            var next = indx + 1;
            $('#subject'+indx).val(val);
            $('#section-subject'+indx).removeClass('play');
            if(indx == 6){
                $('.section-result').addClass('play');
            }else{
                $('#section-subject'+next).addClass('play');
            }
        });

    }

    setTimeout(function(){
        // initLoadingPage();
    },500);
    
    initEvent()
})