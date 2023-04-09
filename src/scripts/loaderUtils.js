function showLoader() {
    const loader = document.getElementById("loadingContainer");
    loader.style.display = "flex";
}


function hideLoader() {
    const loader = document.getElementById("loadingContainer");
    loader.style.display = "none";
}


// window.addEventListener('scroll', function () {
//     const current = window.innerHeight + this.window.scrollY;
//     const maxHeight = document.body.scrollHeight;
//     console.log('check current', current);
//     console.log('check max', maxHeight);
//     if (current -24 == maxHeight) {
//         moreCards();
//       }
// });

// function scrollHandler() {
//     const current = window.innerHeight + window.scrollY;
//     const maxHeight = document.body.scrollHeight;
//     console.log('check current', current);
//     console.log('check max', maxHeight);
//     if (current -24 == maxHeight) {
//         moreCards();
//     }
// }

// let cardContainer = document.getElementById('cardContainer');
// console.log('cardContainer:', cardContainer);

// document.getElementById('cardContainer').addEventListener('scroll', function () {
//     const current = cardContainer.scrollTop + cardContainer.clientHeight;
//     const maxHeight = cardContainer.scrollHeight;
//     console.log('check current', current);
//     console.log('check max', maxHeight);
//     if (current === maxHeight) {
//         console.log('Ende des Scrollens erreicht.');
//     }
// });