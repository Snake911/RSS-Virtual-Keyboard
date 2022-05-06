import './styles/style.scss';
import keyboardList from './keyboard.json';

const body = document.querySelector('body');
const container = document.createElement('div');
container.classList.add('container');
body.append(container);

const textarea = document.createElement('textarea');
container.append(textarea);
textarea.focus();

const keybordContainer = document.createElement('div');
keybordContainer.classList.add('keybordContainer');
container.append(keybordContainer);

keyboardList.forEach((keyObject) => {
    const key = document.createElement('div');
    key.classList.add('key');
    key.innerText = keyObject.en.keyValue;
    key.style.gridColumn = `span ${keyObject.length}`;
    key.id = keyObject.code;
    key.addEventListener('mousedown', (e) => {
        key.classList.add('press');
    });
    key.addEventListener('mouseup', (e) => {
        key.classList.remove('press');
    });
    keybordContainer.append(key);         
});

document.addEventListener('keydown', (e) => {
    e.preventDefault();
    const pressKey = document.getElementById(e.code);
    pressKey.classList.add('press');
});

document.addEventListener('keyup', (e) => {
    e.preventDefault();
    const pressKey = document.getElementById(e.code);
    pressKey.classList.remove('press');
});