console.log('connected')

// Image form
var uploadBtn    = document.getElementById('submit');
var imgInput     = document.getElementById('imgInput');
// Text form
var addTextBtn   = document.getElementById('addTextBtn');
var clearTextBtn = document.getElementById('clearTextBtn');
// Elements on canvas
var block        = document.getElementById('block');
var assetText    = document.createElement('div');

imgInput.file = null;

// Get CSS values from elements
function getCss(elem, property) {
  return window.getComputedStyle(elem, null).getPropertyValue(property);
}

// Clear canvas
function clearCanvas() {
  if (block.firstChild) {
    if (block.firstChild !== assetText) {
      block.removeChild(block.firstChild);
    } else {
      block.removeChild(block.lastChild);
    }
  }
}

// Read selected image in input element
function readImg(evt) {
  var file = imgInput.files[0];
  if (file) {
    // Confirm file type before upload
    if (file.type==='image/png' || file.type==='image/jpeg') {
      getAsImage(file);
    } else {
      clearCanvas();
      alert('File type not supported. Please select an image');
    }
  }
}
// Allow FileReader to read image
function getAsImage(readFile) {
  var reader = new FileReader();
  reader.readAsDataURL(readFile);
  reader.onload = addImg;
  // console.log(reader);
}
// Show selected image on canvas
function addImg(imgsrc) {
  clearCanvas();
  var img = document.createElement('img');
  if (img) {
    img.setAttribute('id', 'imgOnCanvas');
    img.setAttribute('src', imgsrc.target.result);
  }
  // This would fit 100% on block, regardless distortion
  img.style['width'] = getCss(block, 'width');
  img.style['height'] = getCss(block, 'height');
  block.insertBefore(img, null);
}

// Post command - Upload image
function uploads(data) {
  console.log(data);
  // Set new ajax request
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
      if (xhttp.readyState == XMLHttpRequest.DONE ) {
        if (this.readyState = 4 && xhttp.status == 200) {
          console.log(this.responseText);
        }
        else if (xhttp.status == 400) {
          console.log('There was an error 400');
        }
        else {
          console.log('something else other than 200 was returned');
        }
      }
  };

  xhttp.open('POST', '/uploads', true);
  xhttp.send(data);
}

// Get command - Image list
function getImg() {

  // Set new ajax request
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
      if (xhttp.readyState == XMLHttpRequest.DONE ) {
        if (xhttp.status == 200) {
          var imgArr = JSON.parse(this.responseText);
          var list = document.getElementsByTagName('ul');
          for (i = 0; i < imgArr.length; i++) {
            var li = document.createElement('li');
            var imgItem = document.createElement('img');
            imgItem.setAttribute('src', imgArr[i]);
            li.appendChild(imgItem);
            list[0].appendChild(li);
          }
        }
        else if (xhttp.status == 400) {
          console.log('There was an error 400');
        }
        else {
          console.log('something else other than 200 was returned');
        }
      }
  };
  xhttp.open('GET', '/images', true);
  xhttp.send();
}

function addText(text) {
  assetText.setAttribute('id', 'assetText');
  assetText.innerHTML = text.value;
  block.insertBefore(assetText, null);
}

function clearText() {
  assetText.innerHTML = null;
  inputText.value = null;
}

function bindBtn() {
  // Add submit button event
  uploadBtn.addEventListener('click', function (e) {
    uploads(imgInput.files[0]);
    // return TypeError: Cannot read property 'filename' of undefined; but able to upload
    // e.preventDefault();
  })
  // Add input text on the canvas
  addTextBtn.addEventListener('click', function (e) {
    addText(inputText);
    e.preventDefault();
  })
  // Add input text on the canvas
  clearTextBtn.addEventListener('click', function (e) {
    clearText();
    e.preventDefault();
  })
}

// initial states
function init() {
  clearCanvas();
  reader = new FileReader();
  bindBtn();
  getImg();
}

init();
