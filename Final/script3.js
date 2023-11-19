// intersection observer
// a class that take a callback function in its constructor
// can observe multiply elements or entries at the same time
// function will run anytime the visibility of one of the observed elements changes 
// as it handles multiple entries loop is need to be used over them
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {

        // simple conditional check to find out if entry is intersecting viewport or not 
        console.log(entry)

        if (entry.isIntersecting) {

            // will make it visible 
            entry.target.classList.add('show');
            // if want to show the animation once can stop here

        } else {

            // if want to show multiple times then it is needed to remove class show when it is not intersecting 
            entry.target.classList.remove('show');
        }

        // looping all of hidden element
    });
});

// making section containing 'hidden' ID to be come a constant
const hiddenElements = document.querySelectorAll('.hidden');

// telling what to observe by looping all of hidden element and tell observer to observe each one of them
hiddenElements.forEach((el) => observer.observe(el));