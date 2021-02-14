const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
// selected image 
let sliders = [];


// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '15674931-a9d714b6e9d654524df198e00&q';


//hiding spinner
let spinner = document.getElementById("spinner");
spinner.style.display = "none";
let hideTotalNumber = document.getElementById("pic");
hideTotalNumber.style.display = "none";

// show images 
const showImages = (images) => {
  const pictureCount = images.hits.length;
  document.getElementById("total-images").innerHTML = pictureCount;
  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery title
  galleryHeader.style.display = 'flex';
  images.hits.forEach(image => {
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(div)
    loadingSpinner(false);
    document.getElementById("pic").style.display = "block";

  })
}

const getImages = (query) => {
  loadingSpinner(true);
  fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
    .then(data => showImages(data))
    .catch(err => console.log(err))
}

let slideIndex = 0, count = 0;
const selectItem = (event, img) => {
  let element = event.target;
  element.classList.add('added');
  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
  }
   else {
    //alert('Hey, You already added this one!');___ This is not needed.
    element.classList.remove('added');
  }
}
var timer
const makeSlider = () => {
  // check slider image length
  //console.log(sliders);
  if (sliders.length < 2) {
    alert('Hey, You need to select at least 2 images.')
    return;
  }
  // crate slider previous next area
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';
  // hide image aria
  imagesArea.style.display = 'none';
  var duration = document.getElementById('duration').value || 1000;
  sliders.forEach(slide => {
    let item = document.createElement('div')
    item.className = "slider-item";
    item.innerHTML = `<img class="w-100"
    src=${slide}"
    alt="">`;
    sliderContainer.appendChild(item);
  });
  changeSlide(0);
  timer = setInterval(function () {
    slideIndex++;
    changeSlide(slideIndex);
  },durationChange(duration));
}
// Working with duration.
function durationChange(duration)
{
  if(duration >= 0){
    return duration;
  }
  else{
    alert("Put time more than one second. 0, String and Negative values are not accepted")
    document.querySelectorAll('.slider-item').style.display = 'none';
  }
}

// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }
  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}

searchBtn.addEventListener('click', function () {
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  getImages(search.value)
  sliders.length = 0;
})

sliderBtn.addEventListener('click', function () {
  makeSlider()
})


// Function management
const enter = document.getElementById("search");
enter.addEventListener("keyup", function(event){
  if(event.keyCode === 13){
    event.preventDefault();
    document.getElementById("search-btn").click();
  }
})

const loadingSpinner = (show) => {
  const spinner = document.getElementById("spinner");
  const picture = document.getElementById("total-images");
  if(show)
  {
    spinner.style.display = "block";

  }
  else
  {
    spinner.style.display = "none";
  }
  
}