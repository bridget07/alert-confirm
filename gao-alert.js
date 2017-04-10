var log = function(){
    console.log.apply(console, arguments)
}
var e = function(sel){
    return document.querySelector(sel)
}
var appendHtml = function(element, html){
    element.insertAdjacentHTML('beforeend', html)
}
var removeAll = function(sel) {
    var tags = document.querySelectorAll(sel)
    for (var i = 0; i < tags.length; i++) {
        var tag = tags[i]
        tag.remove()
    }
}

// GaoAlert1
var GaoAlert1 = function(title, message) {
    // html
    var t = `
        <div class="modal-container modal-remove">
            <div class="modal-mask"></div>
            <div class="modal-alert vertical-center">
                <div class="modal-title">
                    ${title}
                </div>
                <div class="modal-message">
                    ${message}
                </div>
                <div class="modal-control">
                    <button class="modal-button">OK</button>
                </div>
            </div>
        </div>
    `
    var body = e('body')
    appendHtml(body, t)
    // css
    var css = `
    <style class="modal-remove">
        .modal-container{
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            position: fixed;
        }
        .modal-mask {
            position: fixed;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            background: black;
            opacity: 0.5;
        }
        .modal-alert{
            margin: 0 auto;
            opacity: 1;
            width: 200px;
            background: white;
        }
        .modal-title{
            text-align: center;
            font-size: 27px;
            background: lightblue;
        }
        .modal-message{
            padding: 10px 5px;
            text-align: center;
            background: white;
        }
        .modal-button{
            width: 100%;
            height: 100%;
            border: 0;
            font-size: 22px;
        }
        .vertical-center{
            top: 50%;
            transform: translateY(-50%);
            position: relative;
        }
    </style>
    `
    var head = e('head')
    appendHtml(head, css)
    // js
    e('.modal-control').addEventListener('click', function(){
        log('点击了OK')
        removeAll('.modal-remove')
    })
}
var GaoAlert2 = function(title, message, callback) {
    // html
    var t = `
        <div class="modal-container modal-remove">
            <div class="modal-mask"></div>
            <div class="modal-alert vertical-center">
                <div class="modal-title">
                    ${title}
                </div>
                <div class="modal-message">
                    ${message}
                </div>
                <div class="modal-control">
                    <button class="modal-button" data-type=ok>OK</button>
                    <button class="modal-button" data-type=cancel>Cancel</button>
                </div>
            </div>
        </div>
    `
    var body = e('body')
    appendHtml(body, t)
    // css
    var css = `
    <style class="modal-remove">
        .modal-container {
            position: fixed;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
        }
        .modal-mask {
            position: fixed;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            background: black;
            opacity: 0.5;
        }
        .modal-alert {
            margin: 0 auto;
            width: 200px;
            opacity: 1;
        }
        .modal-title {
            text-align: center;
            font-size: 27px;
            background: lightblue;
        }
        .modal-message {
            padding: 10px 5px;
            background: white;
        }
        .modal-control {
            font-size: 0;
        }
        .modal-button {
            width: 50%;
            height: 100%;
            font-size: 22px;
            border: 0;
        }
        .vertical-center {
            top: 50%;
            position: relative;
            transform: translateY(-50%);
        }
    </style>
    `
    var head = e('head')
    appendHtml(head, css)
    // js
    e('.modal-control').addEventListener('click', function(event){
        log('button-click')
        var type = event.target.dataset.type
        if (type == 'ok') {
            callback(true)
        } else if (type == 'cancel') {
            callback(false)
        }
        removeAll('.modal-remove')
    })
}
var GaoPrompt = function(title, callback) {
    // html
    var t = `
        <div class="modal-container modal-remove">
            <div class="modal-mask"></div>
            <div class="modal-alert vertical-center">
                <div class="modal-title">
                    ${title}
                </div>
                <div class="modal-message">
                <input type="text" class='modal-input'>
                </div>
                <div class="modal-control">
                    <button class="modal-button" data-type=ok>OK</button>
                    <button class="modal-button" data-type=cancel>Cancel</button>
                </div>
            </div>
        </div>
    `
    var body = e('body')
    appendHtml(body, t)
    // css
    var css = `
    <style class="modal-remove">
        .modal-container {
            position: fixed;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
        }
        .modal-mask {
            position: fixed;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            background: black;
            opacity: 0.5;
        }
        .modal-alert {
            margin: 0 auto;
            width: 200px;
            opacity: 1;
        }
        .modal-title {
            text-align: center;
            font-size: 27px;
            background: lightblue;
        }
        .modal-message {
            padding: 10px 5px;
            background: white;
        }
        modal-input {
            width: 100%;
        }
        .modal-control {
            font-size: 0;
        }
        .modal-button {
            width: 50%;
            height: 100%;
            font-size: 22px;
            border: 0;
        }
        .vertical-center {
            top: 50%;
            position: relative;
            transform: translateY(-50%);
        }
    </style>
    `
    var head = e('head')
    appendHtml(head, css)
    // js
    e('.modal-control').addEventListener('click', function(event){
        log('button-click')
        var type = event.target.dataset.type
        if (type == 'ok') {
            var input = e('.modal-input').value
            callback(true, input)
        } else if (type == 'cancel') {
            callback(false)
        }
        removeAll('.modal-remove')
    })
}




var GaoActions = function(title, actions, callback) {
    var templateButton = function(a, i){
        var t =  `
            <button class='modal-action-button' data-index="${i}">${a}</button>
        `
        return t
    }
    var buttons = []
    for (var i = 0; i < actions.length; i++) {
        var a = actions[i]
        buttons.push(templateButton(a, i))
    }
    var actionButtons = buttons.join(' ')
    // html
    var t = `
        <div class="modal-container modal-remove">
            <div class="modal-mask"></div>
            <div class="modal-alert vertical-center">
                <div class="modal-title">
                    ${title}
                </div>
                <div class="modal-message">
                    ${actionButtons}
                </div>
                <div class="modal-control">
                    <button class="modal-button" data-index=-1>Cancel</button>
                </div>
            </div>
        </div>
    `
    var body = e('body')
    appendHtml(body, t)
    // css
    var css = `
    <style class="modal-remove">
        .modal-container {
            position: fixed;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
        }
        .modal-mask {
            position: fixed;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            background: black;
            opacity: 0.5;
        }
        .modal-alert {
            margin: 0 auto;
            width: 200px;
            opacity: 1;
        }
        .modal-title {
            text-align: center;
            font-size: 27px;
            background: lightblue;
        }
        .modal-message {
            padding: 10px 5px;
            background: white;
        }
        button {
            width: 100%;
        }
        .modal-control {
            font-size: 0;
        }
        .modal-button {
            width: 100%;
            height: 100%;
            font-size: 22px;
            border: 0;
        }
        .vertical-center {
            top: 50%;
            position: relative;
            transform: translateY(-50%);
        }
    </style>
    `
    var head = e('head')
    appendHtml(head, css)
    // js
    e('.modal-container').addEventListener('click', function(event){
        log('button-click')
        var index = event.target.dataset.index
        callback(index)
        removeAll('.modal-remove')
    })
}
