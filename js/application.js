console.log('connected')

function testClick() {
  console.log('click');
}

var imgInput = document.getElementById('input');
var uploadBtn = document.getElementById('submit');
var textBtn = document.getElementById('addText');
var block = document.getElementById('block');

// Get CSS values
function getCss(elem, property) {
  return window.getComputedStyle(elem, null).getPropertyValue(property);
}


// To clear canvas
function clearCanvas() {
  while (block.firstChild) {
      block.removeChild(block.firstChild);
  }
}

// Read selected image in input element
function readImg(evt) {
  var file = document.getElementById('input').files[0];
  if (file) {
    if (file.type==='image/png' || file.type==='image/jpeg') {
      getAsImage(file);
    } else {
      clearCanvas();
      alert('Please select an image');
    }
  }
}

function getAsImage(readFile) {
  var reader = new FileReader();
  reader.readAsDataURL(readFile);
  reader.onload = addImg;
  // console.log(reader);
}

function addImg(imgsrc) {
  clearCanvas();
  var img = document.createElement('img');
  img.setAttribute('src', imgsrc.target.result);
  // This would fit 100% on block, regardless distortion
  img.style['width'] = getCss(block, 'width');
  img.style['height'] = getCss(block, 'height');
  block.appendChild(img);
}

function uploads() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     file = this.responseText;
    }
  };
  // request config
  xhttp.open("POST", getAsImage(file), true);
  xhttp.send();
}

function addText(input) {

}

// Add submit button event
uploadBtn
.addEventListener('click', function () {
  testClick();
})

textBtn
.addEventListener('click', function () {
  testClick();
})
