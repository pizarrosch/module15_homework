const button = document.querySelector('.button2');

button.onclick = () => {
  alert(`Ширина Вашего экрана равна ${window.screen.width}px, высота Вашего экрана равна ${window.screen.height}px`);
}