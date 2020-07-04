const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

const $locationButton = document.querySelector('#location-btn')

$locationButton.addEventListener('click', (e) => {
    e.preventDefault()

    if (!navigator.geolocation) {
        return alert('Your browser does not support geolocation.')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''

        fetch(`/location?longitude=${position.coords.longitude}&latitude=${position.coords.latitude}`).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
            })
        })
    })
})

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = searchInput.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})