const slider = () => {
    const ulParent       = document.querySelector('.portfolio-dots')
    const ul             = document.querySelectorAll('li.portfolio-item')
    const arrow          = document.querySelectorAll('a.portfolio-btn')
    let prev_active_img  = document.querySelector('li.portfolio-item-active')
 
    let global_index     = 0
    let interval

    const generateDots = (extraClass = null) => {
        const new_li = document.createElement('li')
        new_li.classList.add('dot')
        ulParent.append(new_li)
        if(extraClass != null){
            new_li.classList.add(extraClass)
        }
    }

    for(let i = 0; i < ul.length; i++){
        i == 0 ? generateDots('dot-active') : generateDots() 
    }

    const dots           = document.querySelectorAll('ul.portfolio-dots li')
    let prev_active_dots = document.querySelector('li.dot-active')

    dots.forEach(item => {
        item.addEventListener('click', e => {
            const index  = [...dots].indexOf(item)
            global_index = index
            
            deletePrevValue(index)
            change(index)
            changePrevValue(item)

        })
    })

    const change = index => {
        ul[index].classList.add('portfolio-item-active')
    }

    const deletePrevValue = index => {
        prev_active_img.classList.remove('portfolio-item-active')
        prev_active_img = ul[index]
    }

    const changePrevValue = item => {
        prev_active_dots.classList.remove('dot-active')
        prev_active_dots = item
        prev_active_dots.classList.add('dot-active')
    }

    arrow[0].addEventListener('click', e => {
        e.preventDefault()
        global_index-- ? ul.length >= 0 : global_index = ul.length - 1
        deletePrevValue(global_index)
        change(global_index)
        changePrevValue(dots[global_index])
    })

    arrow[1].addEventListener('click', e => {
        e.preventDefault()
        shiftSlideRight()
        
    })

    const shiftSlideRight = () => {
        if(global_index == ul.length - 1){ global_index = 0}else{ global_index++}
        
        deletePrevValue(global_index)
        change(global_index)
        changePrevValue(dots[global_index])
    }

    const onAnimateFrame = () => {
        interval = setInterval(shiftSlideRight,3000)
    }

    const offAnimateFrame = () => {
        clearInterval(interval)
    }

    onAnimateFrame()

    ul[0].parentNode.addEventListener('mouseover', e => {
        offAnimateFrame()
    })

    ul[0].parentNode.addEventListener('mouseleave', e => {
        onAnimateFrame() 
    })

}

slider()