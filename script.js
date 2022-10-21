const screens = document.querySelectorAll('.screen');
const choose_lang_btns = document.querySelectorAll('.choose-lang-btn');
const choose_insect_btns = document.querySelectorAll('.choose-insect-btn');
const start_btn = document.getElementById('start-btn');
const game_container = document.getElementById('game-container');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const message = document.getElementById('message');
let seconds = 0;
let score = 0;
let selected_insect = {};

let selected_lang = '';
// const textsPT = document.querySelectorAll('[data-pt]');



//Choose language screen:
choose_lang_btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        screens[0].classList.add('up');
        selected_lang = btn.dataset.lang;
        translateDataset(selected_lang);
        playIntro();
    })
})

function translateDataset(language) {
    if(selected_lang === language){
        const texts = document.querySelectorAll(`[data-${language}]`);
        texts.forEach(text => text.textContent = text.dataset[language]);
    }
}

//Start screen:
function playIntro() {
    const introText = document.querySelector('.intro-text');
    const introTextContent = selected_lang === 'en' ? introText.innerText : introText.dataset[selected_lang];
    let idx = 1;
    
    let interval = setInterval(() => {
        introText.innerText = introTextContent.slice(0, idx);
        idx++;
        if(idx > introTextContent.length) {
            idx = 1;
            clearInterval(interval);
        }
    }, 70)

    setTimeout(() => start_btn.classList.remove('hidden'), 3000)
    
}


// const textEl = document.getElementById('text');
// const speedEl = document.getElementById('speed');
// const text = 'Te amo, Antílope!';
// let idx = 1;
// let speed = 300 / speedEl.value;

// writeText();

// function writeText() {
//     textEl.innerText = text.slice(0, idx);
//     idx++;
//     if(idx > text.length) {
//         idx = 1;
//     }
//     setTimeout(writeText, speed)
// }

start_btn.addEventListener('click', () => screens[1].classList.add('up'));

//Choose insect screen:
choose_insect_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img');
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');
        selected_insect = { src, alt };
        screens[2].classList.add('up');
        setTimeout(createInsect, 1000);
        startGame();
    })
})

function startGame() {
    setInterval(increaseTime, 1000);
    setInterval(createInsect, 4700);
}

//Stopwatch Cronômetro:
function increaseTime() {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;

    if(selected_lang === 'en') {
        timeEl.innerHTML = `Time: ${m}:${s}`;
    } else {
        timeEl.innerHTML = `${timeEl.dataset[selected_lang]} ${m}:${s}`
    }
    
    seconds++
}

function createInsect() {
    const insect = document.createElement('div');
    insect.classList.add('insect');
    const { x, y } = getRandomLocation();
    insect.style.top = `${y}px`;
    insect.style.left = `${x}px`;
    insect.innerHTML = `<img src="${selected_insect.src}" alt ="${selected_insect.alt}" style="transform: rotate(${Math.random() * 360}deg)" />`;

    insect.addEventListener('click', catchInsect);

    game_container.appendChild(insect);
}

function getRandomLocation() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.random() * (width - 100) + 50;
    const y = Math.random() * (height - 200) + 150;
    return { x, y };
}

function catchInsect() {
    increaseScore();
    this.classList.add('caught');
    setTimeout(() => this.remove(), 2000);
    addInsects();
}

function addInsects() {
    setTimeout(createInsect, 1000);
    setTimeout(createInsect, 3500);
}

function increaseScore() {
    score++;
    if(score > 999) {
        message.classList.add('visible');
    }
    scoreEl.innerHTML = selected_lang === 'en' ? `Score: ${score}` : `${scoreEl.dataset[selected_lang]} ${score}`;
}