let dropdowns = document.querySelectorAll(".dropdown")
let active = -1

dropdowns.forEach(d=> {
    
    d.addEventListener("click",_=> {
        let img = d.children[0].children[0]
        img.classList.toggle("pressed")
        d.classList.toggle("dropdownactive")
        
        d.querySelectorAll(".project").forEach(p=> {
            p.classList.toggle("projectopen")
            
        })
        d.querySelectorAll(".h3").forEach(notHere => {
            notHere.classList.toggle("not-here-visible")

        })
    })
})