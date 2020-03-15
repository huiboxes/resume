!function () {
    let view = document.querySelector('section.message')

    let controller = {
        view: null,
        messageList: null,
        init: function(view){
            this.view = view
            this.messageList = view.querySelector('#messageList')
            this.form = view.querySelector('#postMassageForm')
            this.initBmob()
            this.loadMessages()
            this.bindEvents()
        },
        initBmob: function(){
            Bmob.initialize('39b119b361a172a2', '878020');
        },
        loadMessages: function(){
            const query = Bmob.Query("Message");
            query.find().then(res => {
                let array = res.map((item) => item)
                array.forEach((item) => {
                    let li = document.createElement('li')
                    li.innerText = item.name + '：' + item.cover
                    let messageList = document.querySelector('#messageList')
                    messageList.appendChild(li)
                })
            });
        },
        bindEvents: function(){
            let myForm = this.form
            this.form.addEventListener('submit', function (e) {
                e.preventDefault()
                let content = myForm.querySelector('input[name=content]').value
                let name = myForm.querySelector('input[name=name]').value
                const query = Bmob.Query('Message');
                query.set("name", name)
                query.set("cover", content)
                query.save().then(res => {
                    query.find().then(res => {
                        let newData = res[res.length - 1]
                        let li = document.createElement('li')
                        li.innerText = newData.name + '：' + newData.cover
                        let messageList = document.querySelector('#messageList')
                        messageList.appendChild(li)
                    });
                }).catch(err => {
                    alert('提交失败，请改天再来留言')
                })
            })
        }
    }
    controller.init(view)  
}()