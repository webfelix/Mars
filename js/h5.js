/*
 * @Description: 
 * @Author: 熊伟
 * @Date: 2019-08-14 09:21:12
 * @LastEditTime: 2019-08-19 18:22:39
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
    // 计算结果
    function caclResult(){
        var answ1 = $('#subject1').val();
        var answ2 = $('#subject2').val();
        var answ3 = $('#subject3').val();
        var answ4 = $('#subject4').val();
        var answ5 = $('#subject5').val();
        var answ6 = $('#subject6').val();
        // console.log(answ1,answ2,answ3,answ4,answ5,answ6)
        var res1Txt = res2Txt = '';
        // 判断 志愿一：综合管培通道 职位
        if(answ6 == 'A'){
            res1Txt = '玛氏宠物护理事业部';
        }else if(answ6 == 'B'){
            res1Txt = '玛氏皇家事业部';
        }else if(
            (answ6 == 'C' || answ6 == 'D') &&
            (answ2 == 'C' || answ3 == 'D')
        ){
            res1Txt = '全球共享服务中心';
        }else{
            res1Txt = '玛氏箭牌糖果事业部';
        }

        // 判断 志愿二：职能管培通道
        /**
        * 第一题选了A - 研发和供应制造里面，第二题选A - 研发，选C-制造，
        * 如果没中，看第三题，选A-研发，选C-制造，如果都没选到，那就任意通道都符合
        */
        /**
         * 第一题没选A，第二题选D-销售，选B-供应链，如果没选中，
         * 第三题选A-销售，再没选中，第六题B和C - 供应，A和D-销售
         */
        if(answ1 == 'A'){
            if(answ2 == 'A'){
                res2Txt = '研发管理培训生项目';
            }else if(answ2 == 'C'){
                res2Txt = '供应培训生-供应制造方向';
            }else if(answ3 == 'A'){
                res2Txt = '研发管理培训生项目';
            }else if(answ3 == 'C'){
                res2Txt = '供应培训生-供应制造方向';
            }else{
                $('.section-result .has-job').hide();
                $('.section-result .no-job').show();
            }
        }else{
            if(answ2 == 'D'){
                res2Txt = '销售管理培训生项目';
            }else if(answ2 == 'B'){
                res2Txt = '供应培训生-供应链方向';
            }else if(answ3 == 'A'){
                res2Txt = '销售管理培训生项目';
            }else if(answ3 == 'C'){
                res2Txt = '供应培训生-供应链方向';
            }else if(answ6 == 'B' || answ6 == 'C'){
                res2Txt = '供应培训生-供应链方向';
            }else if(answ6 == 'A' || answ6 == 'D'){
                res2Txt = '销售管理培训生项目';
            }else{
                $('.section-result .has-job').hide();
                $('.section-result .no-job').show();
            }
        }

        $('.section-result .result1').text(res1Txt);
        $('.section-result .result2').text(res2Txt);
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
            if(indx == 4 && val == 'C'){
                $.toast('玛氏的管理培训生项目要求候选人敢于挑战自己，把不可能变成可能，所以千万不要在问题面前气馁哦，再想想。');
                return false;
            }
            var next = indx + 1;
            $('#subject'+indx).val(val);
            $('#section-subject'+indx).removeClass('play');
            if(indx == 6){
                caclResult();
                $('.section-result').addClass('play');
            }else{
                $('#section-subject'+next).addClass('play');
            }
        });
        $('#show-share').click(function(){
            $('.section-result').removeClass('play');
            $('.section-share').addClass('play');
        });
        $('#reset-section').click(function(){
            $('.subject-input').val('');
            $('.section-result').removeClass('play');
            $('#section-subject1').addClass('play');
        });

    }

    setTimeout(function(){
        initLoadingPage();
    },500);
    
    initEvent()
})
$.toast = function(msg, duration) {
    $('<div class="toast-modal"><div class="toast">' + msg + '</div></div>').appendTo(document.body);
    $('.toast-modal').css({
		'position': 'fixed',
        'left':'0',
        'right':'0',
        'top':'0',
        'bottom':'0'
	});
	$('.toast').css({
		'position': 'absolute',
        'display': 'inline-block',
        'min-width': '100px',
		'background': 'rgba(0, 0, 0, 0.6)',
		'color':'white',
		'padding': '14px 25px',
		'line-height': '24px',
		'font-size': '16px',
		'width': '75%',
		'z-index': 11000,
		'left': '50%',
		'margin-top': 0,
		'top': '50%',
        'text-align': 'justify',
        'border-radius': '2px',
        'word-break': 'break-all',
        'overflow': 'hidden',
		'-webkit-transform': 'translate(-50%, -50%)',
		'transform': 'translate(-50%, -50%)'
	});
	setTimeout(function() {
		$('.toast-modal').remove();
	}, duration || 4000);
};