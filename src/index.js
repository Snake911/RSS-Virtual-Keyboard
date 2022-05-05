import './styles/style.scss';
import keyboardList from './keyboard.json';

const body = document.querySelector('body');

const textarea = document.createElement('textarea');
body.append(textarea);

const keybordContainer = document.createElement('div');
keybordContainer.classList.add('keybordContainer');
body.append(keybordContainer);

keyboardList.forEach((keyObject) => {
    const key = document.createElement('div');
    key.classList.add('key');
    key.innerText = keyObject.en.keyValue;
    key.style.gridColumn = `span ${keyObject.length}`;
    key.id = keyObject.code;
    keybordContainer.append(key);     
});

document.addEventListener('keydown', (e) => {
    const pressKey = document.getElementById(e.code);
    pressKey.classList.add('press');
});

document.addEventListener('keyup', (e) => {
    const pressKey = document.getElementById(e.code);
    pressKey.classList.remove('press');
});