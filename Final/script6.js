document.addEventListener("mousemove", parallax);

function parallax(e){

    this.querySelectorAll('.layer').forEach(Layer => {

        const speed = Layer.getAttribute('data-speed')
        
        const x = (window.innerWidth - e.pageX*speed)/100
        const y = (window.innerHeight - e.pageY*speed)/100

        Layer.style.transform = `translateX(${x}px) translateX(${y}px)`


    })

}