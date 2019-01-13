class Validate {

    static loginCheck(login, name) {   // Проверка в БД на сходство с другими логинами
        return new Promise.resolve();
    }

    static lengthCheck(date, min, max, err, name) { // Проверка соответствий длинны строки
        let promise = new Promise((resolve, reject) => {
            if ( date.length >= min && date.length <= max ) {
                resolve();
            } else {
                reject([err, name]);
            }
        });
        return promise;
    }

    static passCheck(pass1, pass2, err, name) { // Проверка совпадений паролей
        let promise = new Promise((resolve, reject) => {
            if (pass1 === pass2) {
                return resolve();
            } else {
                return reject([err, name]);
            }
        });
        return promise;
    }

    static dataFormCheck(data, regexp, err, name) { // Проверка соответвия стандарту записи
        
        let promise = new Promise((resolve, reject) => {
            if (data.search(regexp) == -1) {
                return reject([err,  name]); 
            } else {
                return resolve();
            }
        });
        return promise;
    }

    static specialFormCheck(password, err, name) { // Проверка символов пароля
  
        let promise = new Promise((resolve, reject) => {
            if (password.search(/\W/) == -1) {
                return resolve();
            } else {
                return reject([err, name]); 
            }
        });
        return promise;
    }
}

class ModalForm {

    constructor (blurContainers, parent) {
        this.parent = parent;
        this.blurContainers = blurContainers;

        this.blocker = document.createElement("div"); 
        this.blocker.className = "h-blocker";
    }

    render() {

        this.parent.appendChild(this.blocker);  // Убирать активность заднего фона

        this.blurContainers.forEach(elem => {   // Замылить элементы фона
            elem.classList.add("blur"); 
        });
    }


    close() {                                   // Закрыть модальное окно
        this.parent.removeChild(this.blocker); 
        this.blurContainers.forEach(elem => {
            elem.classList.remove("blur");
        });
    }
}

class Registration {

    constructor (name, buttonName, modal, handler) {

        this.name = name;
        this.buttonName = buttonName;
        this.modal = modal;
        this.dataHandler = handler;

        this.inputs = {};            // вложенные объекты Input
        this.wrongInput = undefined; // объект Input с ошибкой ввода
        
        this.registration = this.makingRegistration();
        this.close        = this.makingClose();
        this.button       = this.makingButton();
        this.form         = this.makingform();


        this.registration.appendChild(this.close);
        this.registration.appendChild(this.form);
        this.form.appendChild(this.button);

    }

    makingClose() {                                                         // Функции создания элементов
        const close = document.createElement("button");
        close.className = `${this.buttonName} ${this.name}__close`;
        close.innerHTML = 'Закрыть';
        close.onclick = () => this.modal.close();
        return close
    }
    makingRegistration() {
        const registration = document.createElement("div");
        registration.className = this.name;
        return registration;
    }
    makingButton() {
        const button = document.createElement('button');
        button.innerHTML = 'Готово';
        button.className = `${this.buttonName} ${this.name}__button`;
        button.onclick = (event) => this.doneReg(event);
        return button
    }
    makingform() {
        const form = document.createElement("form");
        form.className = `${this.name}__form form`;
        return form;
    }


    doneReg(event) {                            // Вызывается по нажатию на "Готово", запускает обработку данных формы
        event.preventDefault();

        if (this.wrongInput) {
            this.delWarning()
            this.wrongInput.form__input.classList.remove("form__input_alarm");
            this.wrongInput.form__lable.classList.remove('form__lable_alarm');
        }

        const grab = this.grabInput();
        this.dataHandler(grab, (result) => this.actionDone(result));

    }

    actionDone(error) {                                     // Обработка результатов проверки формы
        if (error) {
            this.warning(error[0]);
            
            this.wrongInput = this.inputs[error[1]];
            this.wrongInput.form__input.classList.add("form__input_alarm");
            this.wrongInput.form__lable.classList.add('form__lable_alarm');
        } else {
            this.modal.close();
            alert("Вы успешно зарегистрированны в системе")
        }
        
    }
 
    grabInput() {                                           // Парсер данных формы
        let grab = {};
        for (let key in this.inputs) {
            grab[key] = this.inputs[key].input.value
        }
        return grab;   
    }

    render() {                                              // Рендер формы регистрации
        this.modal.blocker.appendChild(this.registration);
    }

    createInput(lable, mod, type, maxlength) {                          // Создание объектов Input
        const input = new Input(lable, this.name, mod, type, maxlength);
        this.inputs[mod] = input;
        this.form.insertBefore(input.form__input, this.form.lastChild);
    }

    createAllInputs(params) {                       // Создание пачки объектов Input по параметрам

        params.forEach(elem => {
            this.createInput(...elem);
        })
    }

    warning(alarm) {

        const form__warning = document.createElement("div");
        form__warning.className = "form__warning";

        form__warning.innerHTML = alarm;

        this.form.appendChild(form__warning)
    }

    delWarning() {
        this.form.removeChild(this.form.getElementsByClassName('form__warning')[0])
    }
}



class Input {
    constructor(lable, parentClass, mod, type, maxlength) { 

        this.mod = mod;
        this.parentClass = parentClass;
        this.type = type;
        this.maxlength = maxlength;
        this.lable = lable;

        this.form__input = this.makingForm__input(); // Создание компонентов Input
        this.form__lable = this.makingForm__lable();
        this.input       = this.makingInput();

        this.form__input.appendChild(this.form__lable); // Структура
        this.form__input.appendChild(this.input)
    }

    makingForm__input(){
        const form__input = document.createElement("div");
        form__input.className = "form__input";
        return form__input;
    }
    makingForm__lable() {
        const form__lable = document.createElement("div");
        form__lable.className = "form__lable";
        form__lable.innerHTML = this.lable;
        return form__lable;
    }
    makingInput() {
        const input = document.createElement("input");
        input.className = `${this.parentClass}__input ${this.parentClass}__input_${this.mod}`;
        input.setAttribute("name", this.mod);
        input.setAttribute("type", this.type);
        input.setAttribute("maxlength", this.maxlength)
        input.oninput = () => this.active();
        input.onfocus = () => this.active();
        input.onblur = () => {
            if(this.input.value == false || this.input.value == "+7") {
                this.deactive()
            }
        }
        return input;
    }

    active() {
        this.form__lable.classList.add("form__lable_sm");
    }

    deactive() {
        this.form__lable.classList.remove("form__lable_sm");
    }
}


const alarms = {
    login: {
        DB_error: "Пользователь с таким логином уже зарегистрирован",
        symbol: 'Допускается использовать цифры, буквы латинского алфавита и знак подчеркивания "_"',
        length: "Длинна логина должна быть не менее 3 символов и не более 15"
    },
    phone: "Номер не соответствует стандарту, проверьте правильность введенного номера",
    password: {
        symbol: 'Допускается использовать цифры, буквы латинского алфавита и знак подчеркивания "_"',
        length: "Длинна пароля должна быть не менее 6 символов и не более 16 символов"
    },
    passCheck: "Пароли не совпадают",
    names: {
        symbol:"Необходимо использовать буквы русского или английского языков",
        length: "Длинна строки должна быть менее 1 и не более 35 символов"
    },
    email: {
        symbol:"email не соответствует формату username@mail.domen",
        length: "Длинна не должна быть менее 6 и более 35 символов"
    }
}

const inputsParam = [
    [ "Логин", "login", "text", '15'],
    ["Телефон","phone", "tel", '16'],
    [ "Пароль","password_1", "password", "16"],
    ["Подтверждение","password_2", "password", "16"], 
    [ "Имя","name", "text", '35'],
    [ "Отчество","patron", "text", '35'],
    ["Фамилия","lastname", "text", "35"],
    ["Email","email", "text", "35"]
]


document.addEventListener('DOMContentLoaded', function() {
    
    const reg    = document.getElementById("reg"),   // Основные элементы в документе
          body   = document.getElementById("body"),
          header = document.getElementById("header");

    const phone = /\+7\(\d\d\d\)\d\d\d-\d\d-\d\d/, // Выражения для проверок данных формы
          email = /.+?@.+?\..+?/;
    
    function validateForm(data, done) { // Пресет проверки данных с формы

        Validate.lengthCheck(data.login, 3, 15, alarms.login.length, 'login')                                   // Соответствие длины логина
            .then(() => Validate.specialFormCheck(data.login, alarms.login.symbol, 'login'))                    // Валидность символов логина
            .then(() => Validate.dataFormCheck(data.phone, phone, alarms.phone, 'phone' ))                      // Соответствие формы телефона заданной маске
            .then(() => Validate.lengthCheck(data.password_1, 6, 16, alarms.password.length, 'password_1'))     // Соответствие пароля длине
            .then(() => Validate.specialFormCheck(data.password_1, alarms.password.symbol, 'password_1'))       // Валидность символов пароля
            .then(() => Validate.passCheck(data.password_1, data.password_2, alarms.passCheck, 'password_2'))   // Совпадение паролей
            .then(() => Validate.lengthCheck(data.name, 1, 35, alarms.names.length, 'name'))                    // Длина имени
            .then(() => Validate.lengthCheck(data.patron, 1, 35, alarms.names.length, 'patron'))                // Длина отчества
            .then(() => Validate.lengthCheck(data.lastname, 1, 35, alarms.names.length, 'lastname'))            // Длина фамилии
            .then(() => Validate.dataFormCheck(data.email, email, alarms.email.symbol, 'email'))                // Соответствие email форме записи
            .then(() => Validate.lengthCheck(data.email, 6, 35, alarms.email.length, 'email'))                  // Соответствие email длине
            .then(() => done(false))        // Все получилось
            .catch(error => done(error));   // Ошибка ввода

    }

    function setCursorPosition(pos, elem) {

        elem.focus();
        if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
        else if (elem.createTextRange) {
            let range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd("character", pos);
            range.moveStart("character", pos);
            range.select()
        }
    }

    function mask(event) { // Маска 
        const matrix = "+7(___)___-__-__",
              def    = matrix.replace(/\D/g, "");

        let val = this.value.replace(/\D/g, ""),
            i   = 0;

        if (def.length >= val.length) val = def;
        this.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
        });
        if (event.type == "blur") {
            if (this.value.length == 2) this.value = ""
        } else setCursorPosition(this.value.length, this)
    };


    reg.onclick = () => {

        const modal = new ModalForm([header], body);
        modal.render();

        const registration = new Registration("registration", "button", modal, validateForm);

        registration.render();
        registration.createAllInputs(inputsParam);
        
        registration.inputs.phone.input.addEventListener("input", mask, false);
        registration.inputs.phone.input.addEventListener("focus", mask, false);
        registration.inputs.phone.input.addEventListener("blur", mask, false);
    }




}, false)