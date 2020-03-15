!function () {
    let specialTags = document.querySelectorAll('[data-x]')
    for (let i = 0; i < specialTags.length; i++) {
        specialTags[i].classList.add('offset')
    }

    setTimeout(() => { findClosestAndRemoveOffset() }, 500)
    window.addEventListener('scroll', function (x) {
        findClosestAndRemoveOffset()
    })


    /* helper */
    function findClosestAndRemoveOffset() {
        //滑动高亮a标签
        let specialTags = document.querySelectorAll('[data-x]')
        let minIndex = 0
        for (let i = 0; i < specialTags.length; i++) {
            if (Math.abs(specialTags[i].offsetTop - window.scrollY) < Math.abs(specialTags[minIndex].offsetTop - window.scrollY)) {
                minIndex = i
            }
        }
        //minIndex是离屏幕窗口顶部最近的元素
        specialTags[minIndex].classList.remove('offset')
        let id = specialTags[minIndex].id
        let a = document.querySelector('a[href="#' + id + '"]')
        let li = a.parentNode
        let borthersAndme = li.parentNode.children
        for (let i = 0; i < borthersAndme.length; i++) {
            borthersAndme[i].classList.remove('highLight')
        }
        li.classList.add('highLight')
    }

    let liTags = document.getElementsByClassName('menuTigger')
    for (let i = 0; i < liTags.length; i++) {
        liTags[i].onmouseenter = function (x) {
            x.currentTarget.classList.add('active')
        }
        liTags[i].onmouseleave = function (x) {
            x.currentTarget.classList.remove('active')
        }
    }
}()

