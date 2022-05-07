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
    key.innerText = keyObject.name || keyObject.en.keyValue;
    key.style.gridColumn = `span ${keyObject.length}`;
    key.id = keyObject.code;
    key.addEventListener('mousedown', (e) => {
        e.preventDefault();
        key.classList.add('press');
        document.dispatchEvent(new KeyboardEvent('keydown', {code: keyObject.code, key: keyObject.en.keyValue}))
    });
    key.addEventListener('mouseup', (e) => {
        e.preventDefault();
        key.dispatchEvent(new KeyboardEvent('keyup'))
        key.classList.remove('press');
    });
    keybordContainer.append(key);
});

document.addEventListener('keydown', (e) => {
    if(e.isTrusted) {
        const pressKey = document.getElementById(e.code);
        pressKey.classList.add('press');
    } else {
        if(e.key) {
            const value = textarea.value.split('');
            const position = textarea.selectionStart;
            value.splice(position, 0, e.key);
            textarea.value = value.join('');
            textarea.setSelectionRange(position + 1, position + 1);
        }  
    }

    //arrows
    if(!e.isTrusted && e.code === 'ArrowLeft' && textarea.selectionStart) {
        const position = textarea.selectionStart - 1;
        textarea.setSelectionRange(position, position);
    }
    if(!e.isTrusted && e.code === 'ArrowRight' && textarea.selectionStart) {
        const position = textarea.selectionStart + 1;
        textarea.setSelectionRange(position, position)
    }
});

document.addEventListener('keyup', (e) => {
    if(e.isTrusted) {
        const pressKey = document.getElementById(e.code);
        pressKey.classList.remove('press');
    }
});

