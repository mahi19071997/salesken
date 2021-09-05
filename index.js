var n = 4
var arr = new Array(n * 60).fill(0);
for (var i = 0; i < arr.length; i++) {
    var num = Math.floor(Math.random() * 100)
    arr[i] = num
}
window.onload = function () {

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var width = 8;
    var currX = 30;
    var base = 300;
    ctx.fillStyle = "lightgrey";
    for (var i = 0; i < arr.length; i++) {
        var h = arr[i]
        ctx.fillRect(currX, base - h, width, h);
        currX += width + 5
    }
};

var btn1 = document.getElementById("btn1")

btn1.addEventListener("click", play)
var count = 0
function play() {
    count++
    var canvas = document.getElementById("canvas")
    var ctx = canvas.getContext("2d")
    var width = 8;
    var currX = 30;
    var base = 300;
    for (let i = 0; i < arr.length; i++) {
        var h = arr[i]
        var st = setTimeout(function () {
            ctx.fillRect(currX, base - h, width, h)
            ctx.fillStyle = "red";
            currX += width + 5;
        }, 1000 * i)
    }
    console.log(count)
    if (count % 2 != 0) {
        btn1.removeEventListener("click", play())
    }



}