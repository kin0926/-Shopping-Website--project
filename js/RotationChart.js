addEventListener('DOMContentLoaded', function () {
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    focus.addEventListener('mouseover', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;  //停止后释放它，不用浪费空间（js自动垃圾清理）
    })
    focus.addEventListener('mouseout', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () { arrow_r.click() }, 2000);
    })
    var ul1 = focus.querySelector('ul');
    var ol1 = focus.querySelector('.circle');
    var focusWidth = focus.offsetWidth;
    for (var i = 0; i < ul1.children.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        ol1.appendChild(li);
        li.addEventListener('click', function () {
            for (var i = 0; i < ol1.children.length; i++) {
                ol1.children[i].className = '';
            }
            this.className = 'current';
            //点击小圆圈移动图片,调用动画移动.js里的函数
            var index = this.getAttribute('index');
            num = index;
            SmallCircle = index;
            dhxg(ul1, -index * focusWidth)
        })
    }
    ol1.children[0].className = 'current';

    //克隆第一张图片到最后，也就是首尾是相同的图片
    //先生成小圆圈，之后才克隆，所以小圆圈不会多一个wwGood
    var first = ul1.children[0].cloneNode(true);
    ul1.appendChild(first);

    //关于设置小圆圈的样式的函数
    function Small() {
        for (var i = 0; i < ol1.children.length; i++) {
            ol1.children[i].className = '';
        }
        ol1.children[SmallCircle].className = 'current';
    }

    //右按钮 
    var num = 0;  //计量第几张图片
    var SmallCircle = 0;   //计量第几个小圆圈
    var flag = true;  //节流阀
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false;
            //走到最后一张图片后快速复原成第一张
            if (num == ul1.children.length - 1) {
                ul1.style.left = 0;
                num = 0;
            }
            num++;
            dhxg(ul1, -num * focusWidth, function () {
                flag = true;   //回调函数。节流阀结束，改回true
            });
            SmallCircle++;
            // if (SmallCircle == ol1.children.length) {
            //     SmallCircle = 0;
            // }
            SmallCircle == ol1.children.length ? SmallCircle = 0 : SmallCircle;
            //调用修改小圆圈函数
            Small();
        }

    })
    //左按钮 
    arrow_l.addEventListener('click', function () {
        if(flag){
            flag=false;
            //走到最后一张图片后快速复原成第一张
        if (num == 0) {
            num = ul1.children.length - 1;
            ul1.style.left = -num * focusWidth + 'px';
        }
        num--;
        dhxg(ul1, -num * focusWidth,function(){
            flag = true;   //回调函数。节流阀结束，改回true
        });
        SmallCircle--;
        // if(SmallCircle < 0){
        //     SmallCircle = ol1.children.length-1;
        // }
        SmallCircle < 0 ? SmallCircle = ol1.children.length - 1 : SmallCircle;
        //调用修改小圆圈函数
        Small();
        }
        
    })

    //自动播放功能【定时器】
    let timer = setInterval(function () { arrow_r.click() }, 2000);





























})