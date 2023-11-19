document.getElementById('next').onclick = function(){

    // selecting individual slide and then overall slides 
    let lists = document.querySelectorAll('.item');

    // adding the hovering slides to become a expanded slide after which next is pressed 
    document.getElementById('slide').appendChild(lists[0]);

}

// retrieving button previous in html
document.getElementById('prev').onclick = function(){

    // selecting individual slide and then overall slides 
    let lists = document.querySelectorAll('.item');

    document.getElementById('slide').prepend(lists[lists.length - 1]);
    
}
  