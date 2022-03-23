(function setEventListeners() {
    let sectionVisibilityButtons = document.getElementsByClassName('section-visibility-button')

    for (let i = 0; i < sectionVisibilityButtons.length; i++) {
        sectionVisibilityButtons.item(i).onclick = function() { changeSectionVisibility(sectionVisibilityButtons.item(i)) }
    }

    let emailInput = document.getElementById('e-mail')
    emailInput.addEventListener('input', function() { validateEmail(emailInput) })
    emailInput.addEventListener('input', function() { validateEmailConfirm(emailInput, emailInputConfirm) })

    let emailInputConfirm = document.getElementById("email-confirm")
    emailInputConfirm.addEventListener('input', function() { validateEmailConfirm(emailInput, emailInputConfirm) })

    let passwordInput = document.getElementById('password')
    passwordInput.addEventListener('input', function() { validatePassword(passwordInput) })
    passwordInput.addEventListener('input', function() { validatePasswordConfirm(passwordInput, passwordInputConfirm) })

    let passwordInputConfirm = document.getElementById("password-confirm")
    passwordInputConfirm.addEventListener('input', function() { validatePasswordConfirm(passwordInput, passwordInputConfirm) })

    let showPasswordButton = document.getElementById("show-password")
    showPasswordButton.onclick = function() { showPassword(passwordInput, passwordInputConfirm) }

    let DOBInput = document.getElementById("date-of-birth")
    DOBInput.addEventListener('onchange', function() { validateDateOfBirth(DOBInput) })
})()


function validateDateOfBirth(DOBInput) {
    let enteredDate = new Date(DOBInput.value)

    if (diff_years(enteredDate) < 13) {
        DOBInput.setAttribute('class', 'input-invalid')
        document.getElementById('date-of-birth-error').style.display = 'block'
    } else {
        DOBInput.setAttribute('class', 'form-text-input')
        document.getElementById('date-of-birth-error').style.display = 'none'
    }

    function diff_years(enteredDate) {
        var diff = (enteredDate.getTime() - Date.now()) / 1000;
        diff /= (60 * 60 * 24);
        return Math.abs(Math.round(diff / 365.25));
    }
}

function showPassword(passwordInput, passwordInputConfirm) {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text'
        passwordInputConfirm.type = 'text'
    } else {
        passwordInput.type = 'password'
        passwordInputConfirm.type = 'password'
    }
}

function validatePassword(passwordInput) {
    if (!passwordInput.value.match(
            /^((?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,})$/
        )) {
        passwordInput.setAttribute('class', 'input-invalid')
        document.getElementById('password-error').style.display = 'block'
    } else {
        passwordInput.setAttribute('class', 'form-text-input')
        document.getElementById('password-error').style.display = 'none'
    }

}

function validatePasswordConfirm(passwordInput, passwordInputConfirm) {
    if (passwordInput.value != passwordInputConfirm.value) {
        passwordInputConfirm.parentElement.setAttribute('class', 'input-with-button-invalid')
        document.getElementById('password-confirm-error').style.display = 'block'
    } else {
        passwordInputConfirm.parentElement.setAttribute('class', 'textinput-with-button')
        document.getElementById('password-confirm-error').style.display = 'none'
    }
}

function validateEmailConfirm(emailInput, emailInputConfirm) {
    if (emailInput.value != emailInputConfirm.value) {
        emailInputConfirm.setAttribute('class', 'input-invalid')
        document.getElementById('e-mail-confirm-error').style.display = 'block'
    } else {
        emailInputConfirm.setAttribute('class', 'form-text-input')
        document.getElementById('e-mail-confirm-error').style.display = 'none'
    }
}

function validateEmail(emailInput) {
    if (!emailInput.value.toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
        emailInput.setAttribute('class', 'input-invalid')
        document.getElementById('e-mail-error').style.display = 'block'
    } else {
        emailInput.setAttribute('class', 'form-text-input')
        document.getElementById('e-mail-error').style.display = 'none'
    }
}

//section hiding
function changeSectionVisibility(button) {
    let sectionContent = button.parentElement.parentElement.getElementsByClassName('section-content').item(0)
    let display = sectionContent.style.display

    switch (display) {
        case ('block'):
            setArrowDown(button.firstChild)
            hideContent(sectionContent)
            break
        case ('none'):
            setArrowUp(button.firstChild)
            showContent(sectionContent)
            break
        default:
            setArrowDown(button.firstChild)
            hideContent(sectionContent)
            break
    }

    function hideContent(content) {
        content.style.display = 'none'
    }

    function showContent(content) {
        content.style.display = 'block'
    }

    function setArrowUp(buttonIcon) {
        let iconClass = buttonIcon.getAttribute('class')
        iconClass = iconClass.replace('down', 'up')
        buttonIcon.setAttribute('class', iconClass)
    }

    function setArrowDown(buttonIcon) {
        let iconClass = buttonIcon.getAttribute('class')
        iconClass = iconClass.replace('up', 'down')
        buttonIcon.setAttribute('class', iconClass)
    }
}