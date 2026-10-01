function createEl(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
}

const header = createEl('header', 'header');
const arr = [
    'icons/a.svg', 'icons/a.svg', 'B', 'B', 'C', 'C', 'D', 'D',
    'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];

function createGameBoard() {
    const main = createEl('main', 'main');
    const board = createEl('div', 'board');

    gameArr = shuffle();

    gameArr.forEach(item => {
        card = createEl('div', 'card', item);
        const img = createEl('img', 'card-image');
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
    let firstItem;
    cards.forEach(item => {
        item.addEventListener('click', () => {
            if (count == 0) {
                item.classList.add('active');
                console.log('press 1 time');
                firstItem = item;
                count++;
            } else {
                item.classList.add('active');
                console.log('press 2 time');
                const timerId = setTimeout(() => {
                    if (item.textContent !== firstItem.textContent) {
                        firstItem.classList.remove('active');
                        item.classList.remove('active');
                    }
                    count = 0;
                    firstItem = null;
                }, 500);

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
