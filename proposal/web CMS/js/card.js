//卡片动态效果
var canvas = document.querySelector("canvas");
var ctx    = canvas.getContext("2d");
/**
 * 绘制形状
 * @param s1 {Number} 起点一
 * @param s2 {Number} 起点二
 * @param p1 {Number} 结束点一
 * @param p2 {Number} 结束点二
 */
function draw(s1, s2, p1, p2) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(s1, 0);
    ctx.bezierCurveTo(s1, canvas.height * 0.2, p1, canvas.height * 0.6, p1, canvas.height);
    ctx.lineTo(p2, canvas.height);
    ctx.bezierCurveTo(p2, canvas.height * 0.6, s2, canvas.height * 0.2, s2, 0);
    ctx.lineTo(s1, 0);
    ctx.fillStyle = "rgba(0, 0, 0, .2)";
    ctx.fill();
}
/**
 * 擦除方式
 * @param y {Number}
 * @param speed {Number}
 * @param type 类型，放大或缩小 zoomin、zoomout
 */
function clearRect(y, speed, type) {
    ctx.clearRect(0, y, canvas.width, speed);
}
/**
 * 缩放效果
 * @param s1 {Number} 起点一
 * @param s2 {Number} 起点二
 * @param p1 {Number} 结束点一
 * @param p2 {Number} 结束点二
 * @param type {String} 类型，放大或缩小 zoomin、zoomout
 */
function scale(s1, s2, p1, p2, callback) {
    var dist1 = Math.abs(p1 - s1);
    var dist2 = Math.abs(p2 - s2);
    var d1, d2, _p1, _p2, speed1, y, speed2;
    if (dist1 === 0 || dist2 === 0) {
        dist1 = 1;
        dist2 = 1;
    }
    speed1 = 30;
    speed2 = 30;
    d1     = (p1 >= s1 && p1 < speed1) ? 0 : p1 < s1 ? -speed1 : speed1;
    d2 = p2 < s2 ? -speed1 * dist2 / dist1 : speed1 * dist2 / dist1;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            _p1 = s1;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            _p2 = s2;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            y   = 0;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        var t   = setInterval(function () {
        if (_p2 - _p1 <= p2 - p1) {
            clearInterval(t);
            var timer = setInterval(function () {
                if (y > canvas.height) {
                    clearInterval(timer);
                    callback && callback();
                }
                clearRect(y, speed2);
                y      += speed2;
                speed2 += 1;
            }, 17);
        }
        draw(s1, s2, _p1, _p2);
        _p1 += d1;
        _p2 += d2;
        if ((d1 < 0 && _p1 <= p1) || (d1 > 0 && _p1 >= p1)) {
            _p1 = p1;
        }
        if ((d2 < 0 && _p2 <= p2) || (d2 > 0 && _p2 >= p2)) {
            _p2 = p2;
        }
    }, 17);
}
// var bts = document.querySelectorAll(".social-touch");
// for (var i=0;i<bts.length;i++){
//     var btDelete = $(bts[i]).children("img:last-child");
//     $(btDelete).click(function(){
//         var card                = this.parentNode.parentNode.parentElement;
//         var cardContainer       = document.getElementById("w0");
//         var foot                = document.getElementById("icon")
//             canvas.width        = cardContainer.offsetWidth+200;
//             canvas.height       = $("#icon").offset().top-$(card).offset().top;
//             canvas.style.top    = $(card).offset().top+ "px";
//             canvas.style.zIndex = 10;
//         var s1                  = $(card).offset().left;
//         var s2                  = $(card).offset().left+280;
//         var p1                  = $("#icon").offset().left;
//         var p2                  = $("#icon").offset().left+45;
//         // alert(s1+","+s2+","+p1+","+p2)
//         scale(s1, s2, p1, p2, function () {
//             canvas.style.zIndex = -1;
//         });
//         setTimeout(function(){ 
//             card.style.display = "none";
//             },300); 
//     })
// }
