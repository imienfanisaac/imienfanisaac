let search = document.getElementById("bar")

function drop() {
    document.getElementById("Dropdown").classList.toggle("show");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(e) {
    if (!e.target.matches('.dropbtn')) {
    var myDropdown = document.getElementById("Dropdown");
      if (myDropdown.classList.contains('show')) {
        myDropdown.classList.remove('show');
      }
    }
}

// function renderSearch() {
//   document.getElementById("Dropdown").classList.toggle("sech");
//   let searchEl = document.createElement('div')
//   searchEl.innerHTML = `<form action="/action_page.php">
//   <input type="text" placeholder="Search Songs" name="search">
//   <button type="submit"><i class="fa fa-search"></i></button>
// </form>`  
//  search.append(searchEl)
 
// }searchEl.innerHTML=""