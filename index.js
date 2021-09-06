var nums = [
  11,
  37,
  54,
  48,
  37,
  -7,
  36,
  86,
  79,
  68,
  -10,
  92,
  66,
  44,
  35,
  78,
  88,
  -14,
  39,
  42,
  68,
  82,
  58,
  54,
  29,
  96,
  45,
  -25,
  82,
  54,
  58,
  42,
  68,
  69,
  70,
  -4,
  28,
  89,
  -12,
  32,
  3,
  97,
  94,
  44,
  26,
  23,
  48,
  -39,
  13,
  65,
  79,
  21,
  58,
  48,
  93,
  78,
  -6,
  60,
  33,
  43,
  66,
  91,
  48,
  87,
  94,
  86,
  41,
  -16,
  77,
  23,
  -37,
  44,
  88,
  7,
  18,
  62,
  24,
  64,
  24,
  -11,
  39,
  22,
  56,
  86,
  -8,
  24,
  98,
  20,
  97,
  27,
  -43,
  45,
  2,
  40,
  -24,
  70,
  77,
  22,
  40,
  200
];
function playerFunc() {
  var canvas = document.getElementById("myCanvas");
  var can = canvas.getContext("2d");
  var myAudio = document.getElementById("myAudio");
  var barWidth = 10;
  var startX = 0;
  var startY = 230;
  var tagName = ["T10", "T20", "T60", "T90"]
  var button = document.getElementById("buttn");
  button.className = "fa fa-play";
  var cnt = 0;
  button.addEventListener("click", listnr);
  function listnr() {
    if (cnt === 0) {
      myAudio.play();
      button.className = "fa fa-pause";
      cnt = 1;
    } else {
      myAudio.pause();
      button.className = "fa fa-play";
      cnt = 0;
    }
  }
  can.fillStyle = "#069968";
  can.strokeStyle = "black"
  var val = 30
  var cnt = 0;
  for (var i = 0; i < nums.length; i++) {
    var barHgt = nums[i];
    if (barHgt % 11 == 0 && cnt < 4) {
      can.font = "14pt sans-serif"
      can.strokeStyle="red"
      can.strokeText(tagName[cnt++], val, 80)
    }
    val = val + 40;

    can.fillRect(startX, startY - barHgt, barWidth, barHgt);
    startX += barWidth;
  }
  myAudio.addEventListener("timeupdate", function () {
    var duration = myAudio.duration;
    var currentTime = myAudio.currentTime;
    var perComp = (currentTime / duration) * 100;
    var barsComp = Math.floor(100 / 100) * perComp;
    if (duration > 0) {
      can.clearRect(0, 0, barWidth, barHgt);
      var barWidth = 10;
      var startX = 0;
      var startY = 230;
      for (var i = 0; i < nums.length; i++) {
        var barHgt = nums[i];
        i <= barsComp ? (can.fillStyle = "blue") : (can.fillStyle = "#069968");
        can.fillRect(startX, startY - barHgt, barWidth, barHgt);
        startX += barWidth;
      }
    }
  });
  function positionClick(canvas, evt) {
    var canRect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - canRect.left,
      y: evt.clientY - canRect.top
    };
  }
  canvas.addEventListener("click", canPos);
  function canPos(e) {
    var pos = positionClick(canvas, e);
    var posX = pos.x;
    var posY = pos.y;
    if (posY >= 0 && posY <= startY && posX < 1000) {
      var duration = myAudio.duration;
      var idx = posX / barWidth;
      var totalDone = idx + 1;
      var timeInc = (totalDone * duration) / 100;
      myAudio.currentTime = timeInc;
    }
  }
}
