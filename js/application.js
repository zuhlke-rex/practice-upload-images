console.log('connected')

// Image form
var uploadBtn   = document.getElementById('submit');
var imgInput    = document.getElementById('imgInput');
// Text form
var textBtn     = document.getElementById('textBtn');
// Elements on canvas
var block       = document.getElementById('block');
var assetText = document.createElement('div');

imgInput.file = null;

// Get CSS values
function getCss(elem, property) {
  return window.getComputedStyle(elem, null).getPropertyValue(property);
}

// Clear canvas
function clearCanvas() {
  while (block.firstChild) {
      block.removeChild(block.firstChild);
  }
}

// Read selected image in input element
function readImg(evt) {
  var file = imgInput.files[0];
  if (file) {
    if (file.type==='image/png' || file.type==='image/jpeg') {
      getAsImage(file);
    } else {
      clearCanvas();
      alert('Please select an image');
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
  img.setAttribute('src', imgsrc.target.result);
  // This would fit 100% on block, regardless distortion
  img.style['width'] = getCss(block, 'width');
  img.style['height'] = getCss(block, 'height');
  block.appendChild(img);
}

// Upload Ajax
function uploads(data) {

  // Set new ajax request
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
      if (xhttp.readyState == XMLHttpRequest.DONE ) {
        if (xhttp.status == 200) {
          result.innerHTML = this.responseText;
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

function addText(text) {
  assetText.setAttribute('id', 'assetText');
  assetText.innerHTML = text.value;
  block.insertBefore(assetText, null);
}

  // Add submit button event
  uploadBtn.addEventListener('click', function (e) {
    uploads(imgInput.files[0]);
    // return TypeError: Cannot read property 'filename' of undefined; but able to upload
    // e.preventDefault();
  })
  // Add input text on the canvas
  textBtn.addEventListener('click', function (e) {
    addText(inputText);
    e.preventDefault();
  })
/*

// initial states
function init() {
  clearCanvas();
  reader = new FileReader();
}

init();
*/
