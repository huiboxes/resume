!function () {
    let view = View('section.message')

    let controller = {
        view: null,
        messageList: null,
        init: function (view) {
            this.view = view
            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('#postMassageForm')
            this.initBmob()
            this.loadMessages()
            this.bindEvents()
        },
        initBmob: function () {
            Bmob.initialize('39b119b361a172a2', '878020');
        },
        loadMessages: function () {
            const query = Bmob.Query("Message");
            query.find().then(res => {
                let array = res.map((item) => item)
                array.forEach((item) => {
                    this.createLi(item)
                })
            });
        },
        bindEvents: function () {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault()
                this.saveMessage()
            })
        },
        saveMessage: function () {
            let myForm = this.form
            let content = myForm.querySelector('input[name=content]').value
            let name = myForm.querySelector('input[name=name]').value
            const query = Bmob.Query('Message');
            query.set("name", name)
            query.set("cover", content)
            query.save().then(res => {
                query.find().then(res => {
                    let newData = res[res.length - 1]
                    this.createLi(newData)
                });
            }).catch(err => {
                alert('提交失败，请改天再来留言')
            })
        },
        createLi: function (data) {
            let li = document.createElement('li')
            li.innerText = data.name + '：' + data.cover
            let messageList = document.querySelector('#messageList')
            this.messageList.appendChild(li)
        }
    }
    controller.init(view)
}()