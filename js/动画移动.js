function dhxg(dong, hua, callback) {
    //为了不重复开启多个定时器，先用排他思想
    clearInterval(dong.dhuainterval);
    dong.dhuainterval = setInterval(() => {
        //动画一定不一定都是向前的，所以判断一下，向前就让step向上取整，向后就让step向下取整，因为变速前进会导致有小数，不取整就会变成黄金镇魂曲（永远到达不了的终点）
        var step = (hua - dong.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (dong.offsetLeft == hua) {
            clearInterval(dong.dhuainterval);
            if (callback) {
                callback();
            }
        } else {
            dong.style.left = dong.offsetLeft + step + 'px';  //Math.ceil()向上取整
        }
    }, 15);
}
//调用时先链接js，再调用函数dhxg(p1,p2,p3);