const validators = { ////поправить
    strEmailError:  'Я же просил ввести емейл. Не зли меня',
    strPasswordError: 'Пароль должен быть больше 5 символов',
    strEventEmailError: 'Вводи почту правильно',
    strRepasswordError: 'Пароли не совпадают.',
    strLoginError: 'Логин должен быть больше 3 символов'
}

function include(url) {
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

document.addEventListener('DOMContentLoaded', start);

function start() {
    //include("./replicas")
    var emailError = document.querySelector('.emailError');
    var loginError = document.querySelector('.loginError');
    var passwordError = document.querySelector('.passwordError');
    var repasswordError = document.querySelector('.repasswordError');

    var email = document.getElementById('email');
    var login = document.getElementById("login")
    var password = document.querySelector('#password')
    var repassword = document.getElementById("repassword")

    function showError(widget, str) {
        widget.innerHTML = str;
        widget.className = 'error active';
    }

    function hideError(widget) {
        widget.innerHTML = '';
        widget.className = 'error';
    }

    email.addEventListener('change', () => {
        if (email.validity.valid) {
                hideError(emailError)
            }
            else {
                showError(emailError, validators.strEmailError)
            }
        },
        false
    );

    password.addEventListener('change', () => {
        if(password.validity.valid) {
            hideError(passwordError)

            if (password.value == repassword.value) {
                hideError(repasswordError)
            }
            else {
                showError(repasswordError, validators.strRepasswordError)
            }
        }
        else {
            showError(passwordError, validators.strPasswordError)
        }
    })


    login.addEventListener('change', () => {
        if(login.validity.valid) {
            hideError(loginError)
        }
        else {
            showError(loginError, validators.strLoginError )
        }
    })

    repassword.addEventListener('change', () => {
        if(repassword.validity.valid) {
            hideError(repasswordError)

            if (password.value == repassword.value) {
                hideError(repasswordError)
            }
            else {
                showError(repasswordError, validators.strRepasswordError)
            }
        }
        else {
            showError(repasswordError, validators.strPasswordError)

        }
    })


    document.addEventListener('submit', event => {
            console.log('ЖМЯК'); //тут будет проеб, т.к. это проверяет только по хтмл паттернам
            //если пароли не равны, нас все равно пустят
            if (!email.validity.valid || !password.validity.valid || !repassword.validity.valid || !login.validity.valid || password.value != repassword.value) {
                    event.preventDefault();                
            }
            //если все валидно, то отправляет форму
        },
        false
    );
}
