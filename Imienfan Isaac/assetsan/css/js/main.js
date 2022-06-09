$("#search-icon").click(function () { 
    $(".nav").toggleClass("search"); 
    $(".nav").toggleClass("no-search"); 
    $(".search-input").toggleClass("search-active"); 
}); 
  
$('.menu-toggle').click(function () { 
  $(".nav").toggleClass("mobile-nav"); 
$(this).toggleClass("is-active"); 
});


var slideIndex = 1;
showSlides(slideIndex);

function arrows(n) {
showSlides(slideIndex += n);
}

function currentSlide(n) {
showSlides(slideIndex = n);
}

function showSlides(n) {
var i;
var slides = document.getElementsByClassName("mySlides");
if (n > slides.length) {slideIndex = 1}    
if (n < 1) {slideIndex = slides.length}
for (i = 0; i < slides.length; i++) {
   slides[i].style.display = "none";  
}
slides[slideIndex-1].style.display = "block";  
}