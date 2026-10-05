let count = 0;
let found = 0;
let opened = false;
let firstItem = null;
let timerId = null;

function createEl(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
}

function createHeader() {
    const header = createEl('header', 'header');
    const newGameBtn = createEl('button', 'btn btn-new', 'Новая игра');
    const leadBtn = createEl('button', 'btn btn-lead', 'Победители');
    header.append(newGameBtn, leadBtn);
    newGameBtn.addEventListener('click', startGame);
    return header;
}

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

function createBoard() {

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

    return board;
}

function createStats() {
    const stats = createEl('div', 'stats');

    const movesStat = createEl('div', 'stat');
    const movesLabel = createEl('span', 'stat-label', 'Ходы');
    const movesValue = createEl('span', 'stat-value moves-count', '0');
    movesStat.append(movesLabel, movesValue);

    const pairsStat = createEl('div', 'stat');
    const pairsLabel = createEl('span', 'stat-label', 'Пары');
    const pairsValue = createEl('span', 'stat-value found-pairs', '0 / 8');
    pairsStat.append(pairsLabel, pairsValue);

    stats.append(movesStat, pairsStat);
    return stats;
}

function createMain() {
    const main = createEl('main', 'main');
    main.append(createBoard());
    main.append(createStats());

    return main;
}



function updateStats() {
    const movesCount = document.querySelector('.moves-count');
    const foundPairs = document.querySelector('.found-pairs');
    movesCount.textContent = count;
    foundPairs.textContent = `${found}/8`;
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
    cards.forEach(item => {
        item.addEventListener('click', () => {
            if (item.classList.contains('active') || opened) {
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
                count++;
                if (firstItem.querySelector('img').src === item.querySelector('img').src) {
                    found++;
                    firstItem = null;
                    opened = false;
                } else {
                    const timerId = setTimeout(() => {
                        firstItem.classList.remove('active');
                        item.classList.remove('active');
                        firstItem = null;
                        opened = false;
                        timerId = null;
                    }, 1000);
                }
                updateStats();
            }
        })
    })
}

function startGame() {
    count = 0;
    found = 0;
    opened = false;
    firstItem = null;

    if (timerId !== null) {
        clearTimeout(timerId);
        timerId = null;
    }

    const oldBoard = document.querySelector('.board');
    const newBoard = createBoard();
    oldBoard.replaceWith(newBoard);

    play();
    updateStats();
}



function buildApp() {
    const app = createEl('div', 'app');

    app.append(
        createHeader(),
        createMain(),
    );

    document.body.append(app);
    play();
}

buildApp();
