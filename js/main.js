const slider = document.querySelector('.slider')
const sliderList = document.querySelector('.slider-list')
const sliderItems = document.querySelectorAll('.slider-list__item')
const prevBtn = document.querySelector('.prev')
const nextBtn = document.querySelector('.next')
const progresBar = document.querySelector('.progres-bar')
let moveSlide = 100;
let timeMove = 1000;
let activeSlide = 0;

sliderItems.forEach(function(slide, key){
  if(key != activeSlide){
    slide.style.transform = `translateX(${moveSlide}%)`
  }
  if(key == sliderItems.length - 1){
    slide.style.transform = `translateX(${-moveSlide}%)`
  }
})

prevBtn.addEventListener('click', function(){move(prevBtn)})
nextBtn.addEventListener('click', function(){move(nextBtn)})

let int = 14.28
function move(btn){
  nextBtn.disabled = true
  prevBtn.disabled = true
  setTimeout(function(){
    nextBtn.disabled = false
    prevBtn.disabled = false
  }, timeMove + 200)
  let btnPrevOrNext = btn == nextBtn ? -moveSlide : moveSlide;
  sliderItems.forEach(function(slide, key){
    if(key != activeSlide){
      slide.style.transform = `translateX(${-btnPrevOrNext}%)`
      slide.style.transition = `0ms`
    }
  })
  setTimeout(function(){
    sliderItems[activeSlide].style.transform = `translateX(${btnPrevOrNext}%)`
    sliderItems[activeSlide].style.transition = `${timeMove}ms`
    sliderDotsLi[activeSlide].classList.remove('active')
    if(btn == nextBtn){
      if (activeSlide == 6) {
        int = int - 85.72
        progresBar.style = `width: ${int}%;`
      }else{
        int = int + 14.28
        progresBar.style = `width: ${int}%;`
      }
      activeSlide++
      if(activeSlide > sliderItems.length - 1){
        activeSlide = 0
      }
    }else if(btn == prevBtn){
      if (activeSlide == 0) {
        int = int + 85.72
        progresBar.style = `width: ${int}%;`
      }else{
        int = int - 14.28
        progresBar.style = `width: ${int}%;`
      }
      activeSlide--
      if(activeSlide < 0){
        activeSlide = sliderItems.length - 1
      }
    }
    sliderItems[activeSlide].style.transform = `translateX(0%)`
    sliderItems[activeSlide].style.transition = `${timeMove}ms`
    sliderDotsLi[activeSlide].classList.add('active')
  }, 200)
}

// dots
const ul = document.createElement('ul')
ul.classList.add('slider-dots')
sliderItems.forEach(function(){
  const li = document.createElement('li')
  ul.append(li)
})
slider.append(ul)
const sliderDotsLi = document.querySelectorAll('.slider-dots li')
sliderDotsLi[activeSlide].classList.add('active')
sliderDotsLi.forEach(function(dot, key){
  dot.addEventListener('click', function(){controllers(key)})
})
let active = true
function controllers(dotKey){
  if(active && dotKey != activeSlide){
    sliderItems.forEach(function(slide){
      slide.style.transition = '0ms'
    })
    active = false
    nextBtn.disabled = true
    prevBtn.disabled = true
    sliderDotsLi.forEach(function(dot){dot.classList.remove('active')})
    let moveLeftOrRight = dotKey > activeSlide ? -moveSlide : moveSlide
    sliderItems[dotKey].style.transform = `translateX(${-moveLeftOrRight}%)`
    setTimeout(function(){
      sliderItems[activeSlide].style.transform = `translateX(${moveLeftOrRight}%)`
      sliderItems[activeSlide].style.transition = `${timeMove}ms`
      sliderDotsLi[activeSlide].classList.remove('active')
      activeSlide = dotKey
      sliderItems[activeSlide].style.transform = `translateX(0%)`
      sliderItems[activeSlide].style.transition = `${timeMove}ms`
      sliderDotsLi[activeSlide].classList.add('active')    
    }, 100)
    setTimeout(function(){
      active = true
      nextBtn.disabled = false
      prevBtn.disabled = false
    },timeMove + 200)
  }
}
