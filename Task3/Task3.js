const chatContainer = document.querySelector('.chat-container');
const input = document.querySelector('#input');
const sendButton = document.querySelector('.button1');
const locationButton = document.querySelector('.button2');

const websocket = new WebSocket('wss://echo-ws-service.herokuapp.com');

const message = function() {
  const sentMessage = document.createElement('p');
  sentMessage.innerHTML = input.value;
  sentMessage.classList.add('message', 'sentMessage');
  chatContainer.append(sentMessage);
  sentMessage.scrollIntoView(true);
  websocket.send(input.value);
  input.value = '';

  websocket.onmessage = (e) => {
    setTimeout(() => {
      const respondMessage = document.createElement('p');
      respondMessage.innerHTML = e.data;
      respondMessage.classList.add('message', 'respondMessage');
      chatContainer.append(respondMessage);
      respondMessage.scrollIntoView(true);
    }, 500)
  }
}

sendButton.onclick = () => {
  message();
}

window.onkeydown = (e) => {
  if(e.key === 'Enter') {
    message();
  }
}

locationButton.addEventListener('click', () => {
  const locationMessage = document.createElement('a');
  locationMessage.classList.add('message', 'sentMessage', 'locationMessage');
  locationMessage.target = '_blank';

  function success(position) {
    const {coords} = position;
    locationMessage.href = `https://www.openstreetmap.org/#map=19/${coords.latitude}/${coords.longitude}`
    locationMessage.textContent = 'Гео-локация';
    chatContainer.append(locationMessage);
    locationMessage.scrollIntoView(true);
  }

  navigator.geolocation.getCurrentPosition(success);
})