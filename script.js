function createEl(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
}

const header = createEl('header', 'header');
const arr = [
    'icons/a.svg', 'icons/a.svg',
    'icons/b.svg', 'icons/b.svg',
    'icons/c.svg', 'icons/c.svg',
    'icons/d.svg', 'icons/d.svg',
    'icons/e.svg', 'icons/e.svg',
    'icons/f.svg', 'icons/f.svg',
    'icons/g.svg', 'icons/g.svg',
    'icons/h.svg', 'icons/h.svg'
];

function createGameBoard() {
    const main = createEl('main', 'main');
    const board = createEl('div', 'board');

    gameArr = shuffle();

    gameArr.forEach(item => {
        card = createEl('div', 'card');
        const img = createEl('img', 'card-image');
        img.draggable = false;
        img.src = item;
        img.alt = item;
        card.append(img);
        board.append(card);
    })

    main.append(board);

    return main;
}


function shuffle() {
    newArr = [...arr];
    let temp;
    for (let i = 0; i < newArr.length - 1; i++) {
        let rand = Math.floor(Math.random() * (newArr.length - i) + i);
        temp = newArr[i];
        newArr[i] = newArr[rand];
        newArr[rand] = temp;
    }
    return newArr;
}



function play() {
    const cards = document.querySelectorAll('.card');
    let count = 0;
    let opened = false;
    let firstItem = null;
    cards.forEach(item => {
        item.addEventListener('click', () => {
            if(item.classList.contains('active') || opened){
                return;
            }
            if (!firstItem) {
                item.classList.add('active');
                console.log('press 1 time');
                firstItem = item;
            } else {
                item.classList.add('active');
                opened = true;
                console.log('press 2 time');
                interval = (firstItem.querySelector('img').src == item.querySelector('img').src) ? 0 : 1000;
                const timerId = setTimeout(() => {
                    if (firstItem.querySelector('img').src !== item.querySelector('img').src) {
                        firstItem.classList.remove('active');
                        item.classList.remove('active');
                    } else {
                        count++;
                    }
                    firstItem = null;
                    opened = false;
                }, interval);
            }
        })
    })
}



function buildApp() {
    const app = createEl('div', 'app');

    app.append(
        header,
        createGameBoard()
    );

    document.body.append(app);
    play();
}

buildApp();
