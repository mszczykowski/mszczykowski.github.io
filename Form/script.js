//section hiding

let sectionVisibilityButtons = document.getElementsByClassName('section-visibility-button')

for (let i = 0; i < sectionVisibilityButtons.length; i++) {
    sectionVisibilityButtons.item(i).onclick = function() { changeSectionVisibility(sectionVisibilityButtons.item(i)) }
}

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


//captcha

var captchaValidated = false;

var modal = document.getElementById("captcha-modal");

var showModal = document.getElementById("show-modal");

var span = document.getElementsByClassName("close")[0];

showModal.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

let captchaImages = document.getElementsByClassName("captcha-image")
let captchaImagesState = []
const captchaImagesKey = [true, true, false, false, false, false, true, false, false]

for (let i = 0; i < captchaImages.length; i++) {
    let image = captchaImages.item(i)
    image.onclick = function() { captchaImageOnClick(image, i) }
    captchaImagesState.push(false)
}

function captchaImageOnClick(captchaImage, index) {
    if (captchaImage.className = 'captcha-image') {
        imageSelect(captchaImage, index)
    } else {
        imageDeselect(captchaImage, index)
    }
}

function imageSelect(image, index) {
    captchaImagesState[index] = true
    image.setAttribute('class', 'captcha-image-selected')
}

function imageDeselect(image, index) {
    captchaImagesState[index] = false;
    image.setAttribute('class', 'captcha-image')
}

function deselectAll() {
    let selectedImages = document.getElementsByClassName("captcha-image-selected")

    while (selectedImages.length > 0) {
        selectedImages[0].className = 'captcha-image'
    }
    captchaImagesState.fill(false)
}

document.getElementById("captcha-submit").onclick = function() { checkCaptcha() }

function checkCaptcha() {

    for (let i = 0; i < captchaImagesKey.length; i++) {
        if (captchaImagesKey[i] !== captchaImagesState[i]) {

            document.getElementById('captcha-error').style.display = 'block'
            document.getElementById('show-modal').className = 'human-veryfication-error'
            document.getElementById('human-veryfication-error').style.display = 'block'
            deselectAll()
            return
        }
    }
    document.getElementById('captcha-error').style.display = 'none'

    document.getElementsByClassName('fa-check')[0].style.visibility = 'visible'
    modal.style.display = "none";
    document.getElementById('show-modal').className = 'human-veryfication-show'
    document.getElementById('human-veryfication-error').style.display = 'none'
    showModal.onclick = null
    captchaValidated = true
}


Date.prototype.isValid = function() {
    return this.getTime() === this.getTime();
};

function validateDateOfBirth(DOBInput) {
    let enteredDate = new Date(DOBInput.value)

    if (!enteredDate.isValid() || diff_years(enteredDate) < 13 || diff_years(enteredDate) < 0) {
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

function validateTextInput(input) {
    if (input.value == '') {
        input.className = 'input-invalid'
        input.nextElementSibling.style.display = 'block'
    } else {
        input.className = 'form-text-input'
        input.nextElementSibling.style.display = 'none'
    }

    console.log(input.value)
    console.log(input.nextElementSibling)
}

function validateConsents(consent1, consent2) {
    if (consent1.checked == false || consent2.checked == false)
        document.getElementById('consent-error').style.display = 'block'
    else
        document.getElementById('consent-error').style.display = 'none'
}

function validateCaptcha() {
    if (!captchaValidated) {
        document.getElementById('show-modal').className = 'human-veryfication-error'
        document.getElementById('human-veryfication-error').style.display = 'block'
    } else {
        document.getElementById('show-modal').className = 'human-veryfication-show'
        document.getElementById('human-veryfication-error').style.display = 'none'
    }
}


let nameInput = document.getElementById('first-name')
let lastNameInput = document.getElementById('last-name')


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
DOBInput.addEventListener('input', function() { validateDateOfBirth(DOBInput) })

let cityInput = document.getElementById('city')
let streetInput = document.getElementById('street')
let houseNumberInput = document.getElementById('house-number')
let postalCode = document.getElementById('postal-code')

let consent1 = document.getElementById('consent-1')
let consent2 = document.getElementById('consent-2')

let form = document.getElementById("form")

form.addEventListener('submit', (e) => {
    e.preventDefault()

    validateTextInput(nameInput)

    validateTextInput(lastNameInput)

    validateEmail(emailInput)

    validateEmailConfirm(emailInput, emailInputConfirm)

    validateTextInput(cityInput)

    validatePassword(passwordInput)

    validatePasswordConfirm(passwordInput, passwordInputConfirm)

    validateTextInput(cityInput)

    validateTextInput(streetInput)

    validateTextInput(houseNumberInput)

    validateTextInput(postalCode)

    validateDateOfBirth(DOBInput)

    validateConsents(consent1, consent2)



    validateForm()

})

function validateForm() {
    let errors = document.getElementsByClassName('error-message')

    for (let i = 0; i < errors.length; i++) {
        if (errors.item(i).style.display = 'block') return
    }

    form.reset()
    alert("Form sent!")
}