(function setEventListeners() {
    let sectionVisibilityButtons = document.getElementsByClassName('section-visibility-button')

    for (let i = 0; i < sectionVisibilityButtons.length; i++) {
        sectionVisibilityButtons.item(i).onclick = function() { changeSectionVisibility(sectionVisibilityButtons.item(i)) }
    }

    let emailInput = document.getElementsByName('e-mail');
    emailInput.addEventListener('input', function() { validateEmali(emailInput) })

})()


function validateEmali(emailInput) {

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