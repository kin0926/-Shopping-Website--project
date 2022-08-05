$(function () {
  // 控制电梯导航的显示和隐藏
  var toolTop = $(".recommend").offset().top;
  toggleTool();
  function toggleTool() {
    if ($(document).scrollTop() >= toolTop) {
      $(".fixedtool").fadeIn();
    } else {
      $(".fixedtool").fadeOut();
    };
  }
  $(window).scroll(function () {
    toggleTool();
  });
  // 互斥锁（在后面将会用到）
  var flag = true;
  // 单击电梯导航中的某一项，让页面滚动到相应的内容区域
  $(".fixedtool li").click(function () {
    flag = false;		// 将flag设为ture，表示页面自动滚动
    // 根据索引号，计算页面要去往的位置
    var current = $(".floor .w").eq($(this).index()).offset().top;
    // 利用动画效果实现页面滚动
    $("body, html").stop().animate({
      scrollTop: current
    }, function () {  // 动画完成后执行此方法
      flag = true; 	// 将flag设为true，表示滚动结束
    });
    // 单击之后，为当前的li元素添加current类名，兄弟元素移除current类名
    $(this).addClass("current").siblings().removeClass();
  });
  $(window).scroll(function () {
    toggleTool();
    // 当页面滚动到某个内容区域后，激活电梯导航中对应的选项
    if (flag) {
      $(".floor .w").each(function (i, ele) {
        if ($(document).scrollTop() >= $(ele).offset().top) {
          $(".fixedtool li").eq(i).addClass("current").siblings().removeClass();
        }
      });
    }
  });

/* 下拉列表 */
// 1. 获取元素
var nav = document.querySelector('.nava');
var lis = nav.children;
// 2. 注册鼠标指针经过和鼠标指针离开事件
for (var i = 0; i < lis.length; i++) {
  lis[i].onmouseover = function () {
    this.children[1].style.display = 'block'; // ul为li的第2个子元素
  };
  lis[i].onmouseout = function () {
    this.children[1].style.display = 'none';
  };
}


 /* 返回顶部 */
 var boxTop = $(".box-hd").offset().top;
        $(window).scroll(function () {
          if ($(document).scrollTop() >= boxTop) {
            $(".back").fadeIn();
          } else {
            $(".back").fadeOut();
          }
        });
        $(".back").click(function () {
          $("body, html").stop().animate({
            scrollTop: 0
          });
        });
});



