import './styles/style.scss';
import keysList from './keyboard.json';

const language = localStorage.getItem('lang') || 'en';
localStorage.setItem('lang', language);

const body = document.querySelector('body');
const container = document.createElement('div');
container.classList.add('container');
body.append(container);

const textarea = document.createElement('textarea');
container.append(textarea);
textarea.focus();

const legend = document.createElement('p');
legend.innerText = 'Change language: Shift+Alt';
container.append(legend);

const keyPressed = [];

let caps = false;

function generationKeyboard(keys, lang, cont) {
  const oldKeyboard = document.querySelector('.keybordContainer');
  if (oldKeyboard) {
    oldKeyboard.remove();
  }

  const keybordContainer = document.createElement('div');
  keybordContainer.classList.add('keybordContainer');
  cont.append(keybordContainer);

  keys.forEach((keyObject) => {
    const key = document.createElement('div');
    key.classList.add('key');
    key.innerText = keyObject.name || keyObject[lang].keyValue;
    key.style.gridColumn = `span ${keyObject.length}`;
    key.id = keyObject.code;

    key.addEventListener('mousedown', (e) => {
      e.preventDefault();
      key.classList.add('press');
      document.dispatchEvent(new KeyboardEvent('keydown', {
        code: keyObject.code,
        key: (keyPressed.includes('ShiftLeft') || keyPressed.includes('ShiftRight') || caps)
          ? keyObject[lang].keyValueShift
          : keyObject[lang].keyValue,
      }));
    });

    key.addEventListener('mouseup', (e) => {
      e.preventDefault();
      document.dispatchEvent(new KeyboardEvent('keyup', {
        code: keyObject.code,
        key: (keyPressed.includes('ShiftLeft') || keyPressed.includes('ShiftRight') || caps)
          ? keyObject[lang].keyValueShift
          : keyObject[lang].keyValue,
      }));
      key.classList.remove('press');
    });
    keybordContainer.append(key);
  });
}

generationKeyboard(keysList, language, container);

document.addEventListener('keydown', (e) => {
  keyPressed.push(e.code);
  if (e.isTrusted) {
    const pressKey = document.getElementById(e.code);
    pressKey.classList.add('press');
    if (e.code === 'Tab') {
      e.preventDefault();
      const value = textarea.value.split('');
      const position = textarea.selectionStart;
      value.splice(position, 0, '\t');
      textarea.value = value.join('');
      textarea.setSelectionRange(position + 1, position + 1);
    }
  } else {
    const value = textarea.value.split('');
    let position = textarea.selectionStart;

    if (!e.key) {
      if (e.code === 'Backspace') {
        position -= 1;
        value.splice(position, 1, e.key);
      } else if (e.code === 'Delete') {
        value.splice(position, 1, e.key);
      }
    } else {
      value.splice(position, 0, e.key);
      position += 1;
    }

    textarea.value = value.join('');
    textarea.setSelectionRange(position, position);
  }

  // arrows
  if (!e.isTrusted && e.code === 'ArrowLeft' && textarea.selectionStart) {
    const position = textarea.selectionStart - 1;
    textarea.setSelectionRange(position, position);
  }
  if (!e.isTrusted && e.code === 'ArrowRight' && textarea.selectionStart) {
    const position = textarea.selectionStart + 1;
    textarea.setSelectionRange(position, position);
  }

  if ((keyPressed.includes('ShiftLeft') || keyPressed.includes('ShiftRight')) && (keyPressed.includes('AltLeft') || keyPressed.includes('AltRight'))) {
    if (localStorage.getItem('lang') === 'en') {
      localStorage.setItem('lang', 'ru');
    } else {
      localStorage.setItem('lang', 'en');
    }

    generationKeyboard(keysList, localStorage.getItem('lang'), container);
  }

  if (e.code === 'CapsLock') {
    caps = !caps;
  }
});

document.addEventListener('keyup', (e) => {
  keyPressed.splice(keyPressed.indexOf(e.code), 1);
  if (e.isTrusted) {
    const pressKey = document.getElementById(e.code);
    pressKey.classList.remove('press');
  }
});

textarea.addEventListener('blur', () => {
  textarea.focus();
});
