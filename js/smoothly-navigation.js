!function () {
    var view = View('nav.menu')

    var controller = {
        view: view,
        init: function () {
            this.view = view
            let aTags = view.querySelectorAll('nav > ul > li > a')
            for (let i = 0; i < aTags.length; i++) {
                aTags[i].onclick = function (x) {
                    x.preventDefault()
                    let top = document.querySelector(x.currentTarget.getAttribute('href')).offsetTop //离对应元素的距离
                    let n = 60 //一共动多少次
                    let t = 450 / n //多长时间动一次
                    let currentTop = window.scrollY //当前高度
                    let targetTop = top - 70 //目标高度
                    let s = (targetTop - currentTop) / n//每一次走的距离
                    let i = 0
                    let id = setInterval(() => {
                        if (i === n) {
                            window.clearInterval(id)
                            return
                        }
                        i++
                        window.scrollTo(0, currentTop + s * i)
                    }, t)
                }
            }
        }
    }
    controller.init(view)
}()
