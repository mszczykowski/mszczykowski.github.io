Date.prototype.isValid = function() {
    return this.getTime() === this.getTime();
};

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
    if (captchaImage.className == 'captcha-image') {
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

function showPassword(passwordInput, passwordInputConfirm) {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text'
        passwordInputConfirm.type = 'text'
    } else {
        passwordInput.type = 'password'
        passwordInputConfirm.type = 'password'
    }
}

let showPasswordButton = document.getElementById("show-password")
showPasswordButton.onclick = function() { showPassword(passwordInput, passwordInputConfirm) }

//validation

class ValidationRule {
    constructor(input) {
        if (input) {
            this.input = input

            let self = this
            this.input.addEventListener('onchange', function() { self.isInputValid() })
            this.input.addEventListener('input', function() { self.isInputValid() })
        }
    }

    isInputValid() {
        throw ("not implemented exepction")
    }
}

class DOBValidation extends ValidationRule {
    isInputValid() {
        let enteredDate = new Date(this.input.value)

        if (!enteredDate.isValid() || this.diff_years(enteredDate) < 13 || diff_years(enteredDate) < 0) {
            this.input.setAttribute('class', 'input-invalid')
            document.getElementById('date-of-birth-error').style.display = 'block'
            return false
        } else {
            this.input.setAttribute('class', 'form-text-input')
            document.getElementById('date-of-birth-error').style.display = 'none'
            return true
        }
    }

    diff_years(enteredDate) {
        var diff = (enteredDate.getTime() - Date.now()) / 1000;
        diff /= (60 * 60 * 24);
        return Math.abs(Math.round(diff / 365.25));
    }
}

class PasswordValidation extends ValidationRule {
    isInputValid() {
        if (!this.input.value.match(
                /^((?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,})$/
            )) {
            this.input.setAttribute('class', 'input-invalid')
            document.getElementById('password-error').style.display = 'block'
            return false
        } else {
            this.input.setAttribute('class', 'form-text-input')
            document.getElementById('password-error').style.display = 'none'
            return true
        }
    }
}

class PasswordConfirmValidation extends ValidationRule {
    constructor(input, inputConfirm) {
        super(input)
        this.inputConfirm = inputConfirm
        self = this
        this.inputConfirm.addEventListener('onchange', function() { self.isInputValid() })
        this.inputConfirm.addEventListener('input', function() { self.isInputValid() })
    }


    isInputValid() {
        if (this.input.value != this.inputConfirm.value) {
            this.inputConfirm.parentElement.setAttribute('class', 'input-with-button-invalid')
            document.getElementById('password-confirm-error').style.display = 'block'
            return false
        } else {
            this.inputConfirm.parentElement.setAttribute('class', 'textinput-with-button')
            document.getElementById('password-confirm-error').style.display = 'none'
            return true
        }
    }
}

class EmailValidation extends ValidationRule {
    isInputValid() {
        if (!this.input.value.toLowerCase().match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {
            this.input.setAttribute('class', 'input-invalid')
            document.getElementById('e-mail-error').style.display = 'block'
            return false
        } else {
            this.input.setAttribute('class', 'form-text-input')
            document.getElementById('e-mail-error').style.display = 'none'
            return true
        }
    }
}

class EmailConfirmValidation extends ValidationRule {
    constructor(input, inputConfirm) {
        super(input)
        this.inputConfirm = inputConfirm
        self = this
        this.inputConfirm.addEventListener('onchange', function() { self.isInputValid() })
        this.inputConfirm.addEventListener('input', function() { self.isInputValid() })
    }
    isInputValid() {
        if (this.input.value != this.inputConfirm.value) {
            this.inputConfirm.setAttribute('class', 'input-invalid')
            document.getElementById('e-mail-confirm-error').style.display = 'block'
            return false
        } else {
            this.inputConfirm.setAttribute('class', 'form-text-input')
            document.getElementById('e-mail-confirm-error').style.display = 'none'
            return true
        }
    }
}

class TextInputValidation extends ValidationRule {
    isInputValid() {
        if (this.input.value.trim().length > 0) {
            this.input.className = 'form-text-input'
            this.input.nextElementSibling.style.display = 'none'
            return true
        } else {
            this.input.className = 'input-invalid'
            this.input.nextElementSibling.style.display = 'block'
            return false;
        }
    }
}

class ConsentValidation extends ValidationRule {
    constructor(consent1, consent2) {
        super()
        this.consent1 = consent1
        this.consent2 = consent2
    }

    isInputValid() {
        if (this.consent1.checked == false || this.consent2.checked == false) {
            document.getElementById('consent-error').style.display = 'block'
            return false
        } else {
            document.getElementById('consent-error').style.display = 'none'
            return true
        }

    }
}

class CaptchaValidation extends ValidationRule {
    isInputValid() {
        if (!captchaValidated) {
            document.getElementById('show-modal').className = 'human-veryfication-error'
            document.getElementById('human-veryfication-error').style.display = 'block'
            return false
        } else {
            document.getElementById('show-modal').className = 'human-veryfication-show'
            document.getElementById('human-veryfication-error').style.display = 'none'
            return true
        }
    }
}




let nameInput = document.getElementById('first-name')

let lastNameInput = document.getElementById('last-name')

let emailInput = document.getElementById('e-mail')

let emailInputConfirm = document.getElementById("email-confirm")

let passwordInput = document.getElementById('password')

let passwordInputConfirm = document.getElementById("password-confirm")

let DOBInput = document.getElementById("date-of-birth")

let cityInput = document.getElementById('city')

let streetInput = document.getElementById('street')

let houseNumberInput = document.getElementById('house-number')

let postalCodeInput = document.getElementById('postal-code')

let consent1 = document.getElementById('consent-1')
let consent2 = document.getElementById('consent-2')

let form = document.getElementById("form")

let validationRules = [
    new TextInputValidation(nameInput),
    new TextInputValidation(lastNameInput),
    new EmailValidation(emailInput),
    new EmailConfirmValidation(emailInput, emailInputConfirm),
    new PasswordValidation(passwordInput),
    new PasswordConfirmValidation(passwordInput, passwordInputConfirm),
    new TextInputValidation(cityInput),
    new TextInputValidation(streetInput),
    new TextInputValidation(houseNumberInput),
    new TextInputValidation(postalCodeInput),
    new DOBValidation(DOBInput),
    new ConsentValidation(consent1, consent2),
    new CaptchaValidation()
]

form.addEventListener('submit', (e) => {
    e.preventDefault()

    validateForm()

})

function validateForm() {
    let isFormValid = true

    validationRules.forEach(rule => {
        if (!rule.isInputValid()) isFormValid = false
    })

    if (isFormValid) {
        form.reset()
        alert("Form sent!")
    }

}