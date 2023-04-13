function showLoader() {
    let loader = document.getElementById('loadingContainer');
    loader.style.display = 'flex';
}


function hideLoader() {
    let loader = document.getElementById('loadingContainer');
    loader.style.display = 'none';
}


function toggleMobileNav() {
    let searchContainer = document.getElementById('mobileNavContainer');
    searchContainer.classList.toggle('dNone');
  }


  window.addEventListener('resize', function() {
    let searchContainer = document.getElementById('mobileNavContainer');
    let windowWidth = window.innerWidth;
    if (windowWidth > 668) {
        searchContainer.classList.add('dNone');
    }
  });