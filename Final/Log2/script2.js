// to retrieve element of bar in html and css later on becoming a toggled page
const bar = document.getElementById('bar');
// remove toggled page
const close = document.getElementById('close');
// adding 'active' function to navbar page to show toggled page
const nav = document.getElementById('navbar');

// if clicked on bar
if (bar) {

    // adding event which is when click + arrow function
    bar.addEventListener('click', () => {

        nav.classList.add('active');

    })
    
}

if (close) {

    // adding event which is when click + arrow function
    close.addEventListener('click', () => {

        // removing the toggled page
        nav.classList.remove('active');

    })
    
}