var socket;
function buttonPressed(btn,key){
  $('#'+btn).addClass("active");
  if(key){
    socket.emit('move',key);
  }
}

function buttonRelease(btn){
  $('#'+btn).removeClass("active");
}

function getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  var dataURL = canvas.toDataURL("image/jpeg");
  return dataURL;
}

function captureImage(){
  let date = new Date();
  let fileName = date.toLocaleDateString().replace(new RegExp('/',"g"),'-')+'_'+date.toLocaleTimeString().replace(new RegExp(':',"g"),'-').replace(new RegExp(' ',"g"),'-')+'.jpg';
  let ele = $('#currentImage');
  let b64 = getBase64Image(document.getElementById('currentImage'));
  let link = document.createElement('a')
  link.href = b64;
  link.download = fileName;
  $('#captured-image').html("");
  $('#captured-image').append(link);
  link.click();
}
function initSocketIO() {
       socket = io.connect('//' + document.domain + ':' + location.port);
}
$(document).ready(function(){
  initSocketIO();
  //KeyPress Event
  $(document).keydown(function(e){
    let key = e.originalEvent.key;
    switch (key) {
      case 'ArrowUp':
      case 'w' : buttonPressed('forward-button','f'); break;
      case 'ArrowDown':
      case 's' : buttonPressed('back-button','b'); break;
      case 'ArrowLeft':
      case 'a' : buttonPressed('left-button','l'); break;
      case 'ArrowRight':
      case 'd' : buttonPressed('right-button','r'); break;
      case ' ': buttonPressed('capture-button'); break;
      default:
    }
  });
  //KeyRelease Event
  $(document).keyup(function(e){
    let key = e.originalEvent.key;
    switch (key) {
      case 'ArrowUp':
      case 'w' : buttonRelease('forward-button'); break;
      case 'ArrowDown':
      case 's' : buttonRelease('back-button'); break;
      case 'ArrowLeft':
      case 'a' : buttonRelease('left-button'); break;
      case 'ArrowRight':
      case 'd' : buttonRelease('right-button'); break;
      case ' ' :  buttonRelease('capture-button'); captureImage();break;
      default:
    }
  });
  //Scroll up events
  $(document).bind('DOMMouseScroll mousewheel',function(e){
    if(e.originalEvent.wheelDelta/120 > 0 || e.originalEvent.detail < 0){
      buttonPressed('camera-up','u');
      setTimeout(function(){
        buttonRelease('camera-up');
      },250);
    }else{
      buttonPressed('camera-down','d');
      setTimeout(function(){
        buttonRelease('camera-down');
      },250);
    }
  })

});
