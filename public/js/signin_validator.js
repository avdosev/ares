const validators = { // все еще не понимаю как вынести это все
    strEmailError:  'Я же просил ввести емейл. Не зли меня',
    strPasswordError: 'Пароль должен быть больше 5 символов',
    strEventEmailError: 'Вводи почту правильно',
    strRepasswordError: 'Пароли не совпадают.',
    strLoginError: 'Логин должен быть больше 3 символов',
    emailRegExp: new RegExp('.+@.+\\..+'),
    passwordRegExp: new RegExp('.{5,}')
}


document.addEventListener('DOMContentLoaded', start);

function start() {
    const email = document.querySelector('#email');
    const emailError = document.querySelector('.emailError');
    const passwordError = document.querySelector('.passwordError');
    const serverError = document.querySelector(".serverError")

    const password = document.querySelector('#password')
    const sendBtn = document.querySelector("#submit")
    

    function showError(spanError, str) {
        spanError.innerHTML = str;
        spanError.className = 'error active';
    }

    function hideError(spanError) {
        spanError.innerHTML = '';
        spanError.className = 'error';
    }

    function checkValidation(widget, errorSpan, strError) {
        if (widget.validity.valid) {
            hideError(errorSpan)
        }
        else {
            showError(errorSpan, strError)
        }
    }
    
    email.addEventListener('input', () => {
        hideError(serverError)
        checkValidation(email, emailError, validators.strEmailError)
    });

    password.addEventListener('input', () => {
        hideError(serverError)
        checkValidation(password, passwordError, validators.strPasswordError)
    })

    function errorHandler(err) {
        showError(serverError, err)
    }


    sendBtn.addEventListener('click', (event) => {
            if ( !email.value.match(validators.emailRegExp) )  { //пусть будет так
                showError(emailError, validators.strEventEmailError)
            }
            else if(!password.value.match(validators.passwordRegExp) ) {
                showError(passwordError, validators.strPasswordError)
            }
            else { // валидация на фронте пройдена, делаем запрос к серверу и смотрим на его ответ
                console.log("запрос")
                const options = {
                    method:"post",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "email": email.value,
                        "password": password.value
                    })
                }
                fetch("/sign_In", options).then(response => {
                    if (response.ok) {
                        document.location.href = "/"
                    }
                    else {
                        return response.text()
                    }
                }).then((err_text) => {
                    errorHandler(err_text)
                    console.error(err_text)
                }).catch((err) => {
                    console.error(err)
                })
            }
        },
        false
    );
}
