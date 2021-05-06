let interfaceControlsFunctions = {
    addTask() {
        functionalities.clearErrors()
        document.querySelector('article.modal.closed').classList.remove('closed')
    },
    removeTask() {
        let check = document.querySelectorAll('input[type="checkbox"]')
        check.forEach((el) => {
            if (el.checked == true) {
                let pai = el.parentNode.parentNode
                document.querySelector('section.interface-section').removeChild(pai)
                functionalities.showHelp()
            }
        })
    }
}

let functionalities = {
    handleSubmit: (el) => {
        el.preventDefault()
        functionalities.clearErrors()
        let send = true
        let inputs = document.querySelectorAll('input')
        inputs.forEach((event) => {
            let input = event
            let checkResult = functionalities.checkInput(input)
            if(checkResult !== true) {
                send = false
                functionalities.showError(input, checkResult)
            }
        })
        return send
    },
    checkInput: (input) => {
        let rules = input.getAttribute('data-rules')
        if(rules !== null) {
            rules = rules.split('|')
            for(let i in rules) {
                let rDetail = rules[i].split('=')
                switch(rDetail[0]) {
                    case 'required':
                        if(input.value == 0){
                            return('Campo obrigatório!')
                        }
                    break;
                }
            }
        }
        return true
    },
    showError: (input, error) => {
        input.style.borderColor =  'red'

        let errorElement = document.createElement('div')
        errorElement.classList.add('error');
        errorElement.innerHTML = error
        input.parentElement.insertBefore(errorElement, input.ElementSibling)
    },
    clearErrors: () => {
        let inputs =  document.querySelectorAll('input')
        for(let i = 0; i < inputs.length; i++){
            inputs[i].style = ''
        }
        let errorElements = document.querySelectorAll('.error')
        for(let i = 0; i < errorElements.length; i++){
            errorElements[i].remove()
        }
    },
    formatDate: (date) => {
        date = String(date)
        console.log(date)
        let dia = date.slice(8, 10)
        let mes = date.slice(5, 7)
        let ano = date.slice(0, 4)
        date = `${dia}/${mes}/${ano}`
        return date
    },
    showHelp: () => {
        let interface = document.querySelector('.interface-section')
        console.log(interface.childNodes.length)
        if(interface.childNodes.length == 3) {
            interface.classList.add('empty')
            document.querySelector('p.help').classList.remove('hidden')
        }
    }
}

let modalControlsFunctions = {
    cancel() {
        document.querySelector('article.modal').classList.add('closed')
        document.querySelector('input#taskname').value = ''
        document.querySelector('input#taskdate').value = ''
        functionalities.clearErrors()
    },
    send(el) {
        let sendResult  = functionalities.handleSubmit(el)
        if(sendResult){
            let taskTitle = document.querySelector('input#taskname').value
            let taskDate = document.querySelector('input#taskdate').value
            taskDate = functionalities.formatDate(taskDate)
            modalControlsFunctions.cancel()
            let interface = document.querySelector('.interface-section')
            if(interface.classList[1] == 'empty') {
                document.querySelector('.interface-section').classList.remove('empty')
                document.querySelector('p.help').classList.add('hidden')
            }
            interface.innerHTML +=
            `<article class="row-task">
                <div class="title-task">
                    <input type="checkbox">
                    <p>${taskTitle}</p>
                </div>
                <div class="date-task">
                    <p>${taskDate}</p>
                </div>
            </article>`
        }
    }
}


let bttnInterface = document.querySelectorAll('div.button')
bttnInterface.forEach((el, index) => {
    bttnInterface[index].addEventListener('click', () => {
        let clickedBttn = el.classList[1]
        interfaceControlsFunctions[clickedBttn]()
    })
})

document.querySelector('button.cancel').addEventListener('click', modalControlsFunctions.cancel)
document.querySelector('form.modal-form').addEventListener('submit', modalControlsFunctions.send)


