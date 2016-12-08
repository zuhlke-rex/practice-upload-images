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
// Image items
var imgItem      = document.getElementsByClassName('imgItem');

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

// Prepare img list
function appendImg(imgArr) {
  var list = document.getElementsByTagName('ul');
  for (i = 0; i < imgArr.length; i++) {
    var li = document.createElement('li');
    var newimgItem = document.createElement('img');
    newimgItem.setAttribute('src', imgArr[i]);
    newimgItem.setAttribute('class', 'imgItem');
    newimgItem.addEventListener('click', function(e) {
      addImg(e);
        // addImg(e);
    })
    li.appendChild(newimgItem);
    list[0].appendChild(li);
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
}
// Show selected image on canvas
function addImg(imgsrc) {
  clearCanvas();
  var newImg = document.createElement('img');
  if (newImg) {
    newImg.setAttribute('id', 'imgOnCanvas');
    if ( imgsrc.target.result ) {
      newImg.setAttribute('src', imgsrc.target.result);
    } else {
      newImg.setAttribute('src', imgsrc.target.src);
    }
  }
  // This would fit 100% on block, regardless distortion
  newImg.style['width'] = getCss(block, 'width');
  newImg.style['height'] = getCss(block, 'height');
  block.insertBefore(newImg, null);
}

// Post command - Upload image
function uploads(data) {
  // if no file selected
  if (!data) {
    // Stop the event
    alert('Please select an image.');
    event.preventDefault();
  } else {
    // Set new ajax request
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == XMLHttpRequest.DONE ) {
          if (this.readyState = 4 && xhttp.status == 200) {
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
}

// Get command - Image list
function getImg() {
  // Set new ajax request
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (xhttp.readyState == XMLHttpRequest.DONE ) {
        if (xhttp.status == 200) {
          appendImg(JSON.parse(this.responseText));
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

// Text button functions
function addText(text) {
  assetText.setAttribute('id', 'assetText');
  assetText.innerHTML = text.value;
  block.insertBefore(assetText, null);
}

function clearText() {
  assetText.innerHTML = null;
  inputText.value = null;
}

// Bind keys
function bindBtn() {
  // Add submit button event
  uploadBtn.addEventListener('click', function (e) {
    uploads(imgInput.files[0]);
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
