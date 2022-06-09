 let book = document.getElementById("trash")
  function bookNow() {
  
    book.innerHTML = ""
            let bkn = document.createElement('div')
            bkn.innerHTML = `<div id="trash"><p> To book with Bobby (The master barber) <br>call <b>07064354545</b> <br> Mobile line is open for bookings from 7am- 10pm daily
            <p><u>Bobby's Afro Base opening hours<u/></p>
            <p>Monday to Saturday: 10am to 6pm<br>
            Sunday: Closed</p></div> `
            book.append(bkn)         

    var x = document.getElementById("trash");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
  


  var Ind = 1;
  showSlides(Ind);
  

  function plusSlides(n) {
    showSlides(Ind += n);
  }
  function currentSlide(n) {
    showSlides(Ind = n);
  }
  
  function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("products");
    if (n > slides.length) {Ind = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[Ind-1].style.display = "flex";

  }
  

window.onscroll = function() {
  myFunction()
};
function myFunction() {
  if (document.documentElement.scrollTop == 10) {
    document.getElementById("body").className = "sticky-header";
  } else {
    document.getElementById("body").className="";
  }
}


  var slideIndx = 1;
  showSldes(slideIndx);
  function plusSldes(n) {
    showSldes(slideIndx += n);
  }
  function currntSlide(n) {
    showSldes(slideIndx = n);
  }
  
  function showSldes(n) {
    var i;
    var sldes = document.getElementsByClassName("picture");
    if (n > sldes.length) {slideIndx = 1}
    if (n < 1) {slideIndx = sldes.length}
    for (i = 0; i < sldes.length; i++) {
        sldes[i].style.display = "none";
    }

    sldes[slideIndex-1].style.display = "flex";

  }
  var slideIndex = 0;
  showSlides();
 

  function menuBar() {
    var x = document.getElementById("myTopnav");
    if (x.className === "nv") {
      x.className += " responsive";
    } else {
      x.className = "nv";
    }
  }

