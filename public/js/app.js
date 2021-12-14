const weatherForm = document.querySelector('#search-form');
const searchBar = document.querySelector('#search-bar');
const messageOne = document.querySelector('#message-top');
const messageTwo = document.querySelector('#message-bottom')


weatherForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const query = searchBar.value
  
  messageOne.textContent = 'Loading'
  messageTwo.textContent = ''

  // originally the fetch used the URL http://localhost:3000/weather?address=${query} but since we want this to work with heroku we modified it to whats below
  fetch(`/weather?address=${query}`).then((response) => {
  response.json().then((data) => {
    if (data.error) {
      return messageOne.textContent = data.error;
    }
    messageOne.textContent = data.location
    messageTwo.textContent = data.forecast
  })
})
})