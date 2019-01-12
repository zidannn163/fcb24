document.addEventListener('DOMContentLoaded', function() {
    
    class ModalForm {

        constructor () {

        }

        render() {

        }

    }

    class Registration {

        constructor () {

        }

        createInput() {

        }
    }

    class Input {
        constructor(lable, classes) {
            this.classes = classes;
            this.lable = lable;
            this.form__input = createElement("div");
            this.form__input.className = "form__lable";
            
        }

        render(){
            const form__input = createElement("div");
            
        }
        warning() {
            
        }

    }


    const alarms = {
        username: "Пользователь с таким логином уже зарегистрирован",
        phone: "Номер не соответствует стандарту, проверьте правильность введенного номера",
        password: {
            symbol: "Недопустимо использование спецсимволов: ¶® ÷×-+ ♦♥♣♠ ,.?! и проч.",
            length: "Длинна пароля должна быть не менее 6 символов и не более 16 символов"
        },
        passCheck: "Пароли не совпадают",
        names: {
            symbol:"Необходимо использовать буквы русского или английского языков",
            length: "Длинна не должна превышать 35 символов"
        },
        email: {
            symbol:"email не соответствует формату username@mail.domen",
            length: "Длинна не должна превышать 35 символов"
        }
    }


}, false)